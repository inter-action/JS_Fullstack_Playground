# Typeorm    
    


## tables & columns

    https://typeorm.github.io/tables-and-columns.html

this link lists various strategies to map OOP models to SQL models.

* embeded: merge n tables into one
* Tree models:
    * Adjacency list: simple, not effective
    * Closure table: effective, I haven't look it up yet.
* Table inheritance: try to avoid inheritance
    * Concrete table inheritance: flat all parents fields down to each child model, create a concrete table each model.
        https://martinfowler.com/eaaCatalog/concreteTableInheritance.html

    * Single table inheritance: flat inheritance into one single model, create a single table, load it through selective query.
        https://martinfowler.com/eaaCatalog/singleTableInheritance.html

    * Class table inheritance: map each js model to each concrete table, load it through join.
        https://martinfowler.com/eaaCatalog/classTableInheritance.html


## Notes

* JoinColumn()

    Note that we should use @JoinColumn only on one side of relation. The side you put this decorator on, will be the owning side of relationship. Owning side of relationship contains a column with a foreign key in the database.


* ManyToOne

    In many-to-one / one-to-many relation, owner side is always many-to-one. It means that class which uses @ManyToOne will store id of the related object.


* how to read `OneToMany` & `ManyToOne`

    @OneToMany(type => Category, category => category.children)
    parent: Category;
    //one `parent` has many child
    // its type is `Category`, and its props is `childrend`

    @ManyToOne(type => Category, category => category.parent)
    children: Category;
    //many `parent` has one child
    // its type is `Category`, and its props is `parent`
