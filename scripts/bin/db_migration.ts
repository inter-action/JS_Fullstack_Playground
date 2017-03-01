import { getConnection, connect } from '../../server/config/typeorm';
import { configEnv } from '../../server/config';

// ./migration -command migration | seed
export async function migration() {
    await getConnection().syncSchema(true)
}

export async function seed() {
    await migration();
    return await require(`../typeorm/seed/${process.env.NODE_ENV}`).seed();
}

function parse(args: string[]): any {
    let result = {}
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '-command':
                result['command'] = args[i + 1]
                i++
                break;
            case '-env':
                result['env'] = args[i + 1]
                i++;
                break;
        }
    }
    return result;
}

if (require.main === module) {
    let args = process.argv.slice(2);
    console.log('args is: ', args)
    let argument = parse(args);
    let target: any = null
    if (argument.command === 'migration') {
        target = migration;
    } else if (argument.command === 'seed') {
        target = seed
    }
    process.env.NODE_ENV = argument.env || process.env.NODE_ENV;
    if (target == null || argument.env == null) {
        console.log('do db migration, -env is default to process.env.NODE_ENV')
        console.log('./migration -env [dev|test] -command [migration | seed]')
    } else {
        console.log(`do ${argument.command} using env: ${process.env.NODE_ENV}`)
        configEnv();

        connect().then(_ => {
            return target()
        }).then(_ => {
            console.log(`done ${argument.command} using env: ${process.env.NODE_ENV}`)
            process.exit(0);
        }, e => {
            console.log('fatal error: ', e.stack)
            process.exit(1);
        })
    }
}
