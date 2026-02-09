import { UserRole } from '@cofounder/types';
import { AuthUser, BrandAccess } from './types';

/**
 * Checks if a user has access to a specific brand with a required role level.
 */
export function hasBrandAccess(
    user: AuthUser,
    brandId: string,
    requiredRole?: BrandAccess['role']
): boolean {
    if (user.role === 'SUPER_ADMIN') return true;

    const access = user.brandAccess.find(a => a.brandId === brandId);
    if (!access) return false;

    if (!requiredRole) return true;

    const rolePriority: Record<BrandAccess['role'], number> = {
        'OWNER': 3,
        'MANAGER': 2,
        'SUPPORT': 1,
        'CUSTOMER': 0
    };

    return rolePriority[access.role] >= rolePriority[requiredRole];
}

/**
 * Checks if a user has a platform-level role.
 */
export function hasPlatformRole(user: AuthUser, requiredRole: UserRole): boolean {
    const rolePriority: Record<UserRole, number> = {
        'SUPER_ADMIN': 3,
        'ADMIN': 2,
        'STAFF': 1,
        'CUSTOMER': 0
    };

    return rolePriority[user.role] >= rolePriority[requiredRole];
}

export * from './types';
