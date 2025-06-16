import {AbacTypes} from "../types/abac.types.ts";
import {User} from "../types/role.ts";
import {Policy} from "../policies/policy.ts";

export class Abac {

    constructor(private policyService: Policy) {}

    private  extractContext(user:User,actionType: string, resourceType: string):AbacTypes {

        return {
            subject:user?.role,
            action:actionType,
            resource:resourceType,
        }

    }
    private  matchPolicy(context:AbacTypes):boolean{
        const policies = this.policyService.getPoliciesBySubject(context.subject);
         return policies.some(policy=>{
             return policy.subject === context.subject&&
                 policy.action === context.action &&
                 policy.resource === context.resource;
         })
    }
      evaluate(user:User, action:string, resource:string,condition?:Record<string, string>):boolean {
        const context = this.extractContext(user,action,resource);
          console.log(context);
        return this.matchPolicy(context)
     }
}
