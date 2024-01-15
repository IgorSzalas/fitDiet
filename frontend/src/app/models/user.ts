export class User {
  constructor(
    public dietProgres: any[],
    public favouriteIngredients: string[],
    public dislikedIngredients: string[],
    public ingredients: string[],
    public firstName: string,
    public surname: string,
    public email: string,
    public password: string,
    public userHeight: number,
    public userWeight: number,
    public userAge: number,
    public userActivityMode: number,
    public userGender: string,
    public userType: string,
    public plannedDishes: any,
    public caloricDemand: any,
    public dateOfBirth: string,
    public dishesWithMeat: boolean,
    public dishesWithGluten: boolean,
    public dishesWithLactose: boolean
  ) {
    (this.favouriteIngredients = favouriteIngredients ?? []),
      (this.dislikedIngredients = dislikedIngredients ?? []),
      (this.ingredients = ingredients ?? []);
    this.dietProgres = dietProgres ?? [];
  }
}
