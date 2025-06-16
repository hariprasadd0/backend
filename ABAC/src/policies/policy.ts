import policies from '../config/policies.json';

 type PolicyRule = {
    subject: string;
    resource: string;
    action: string;
};

export class Policy {
    private policies = new Map<string, PolicyRule[]>();

    constructor() {
        this.loadPolicyRules()
    }

    public loadPolicyRules(): void {
        Object.entries(policies).forEach(([key, policyArray]) => {
            const subject = key.replace('_policies', '');

            this.policies.set(subject, policyArray as PolicyRule[]);
        });
    }

    public getPoliciesBySubject(subject: string): PolicyRule[] {
        return this.policies.get(subject) || [];
    }
}