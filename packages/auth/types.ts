import { UserRole } from '@cofounder/types';

export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    image?: string;
    role: UserRole;
    brandAccess: BrandAccess[];
}

export interface BrandAccess {
    brandId: string;
    role: 'OWNER' | 'MANAGER' | 'SUPPORT' | 'CUSTOMER';
}

export interface Session {
    user: AuthUser;
    expires: string;
}
