import {NotFoundError} from "../errors/NotFoundError.ts";
import {Abac} from "../middleware/abac.ts";
import {User} from "../types/role.ts";
import {AccessDenied} from "../errors/AccessDenied.ts";

export class UserService {
    constructor(private abacService:Abac) {
    }

  getAllProducts(user:User) {
      const allowed = this.abacService.evaluate(user,'redad','product')
      if(!allowed){
          throw new AccessDenied('User');
      }
      return [
          {
              id: 'prod-101',
              name: 'Wireless Noise-Cancelling Headphones',
              description: 'Over-ear Bluetooth headphones with active noise cancellation.',
              price: 129.99,
              category: 'Electronics',
              inStock: true
          },
          {
              id: 'prod-102',
              name: 'Smart LED Desk Lamp',
              description: 'Adjustable LED lamp with touch controls and USB charging port.',
              price: 39.95,
              category: 'Home Office',
              inStock: true
          }
      ];
  }


}

