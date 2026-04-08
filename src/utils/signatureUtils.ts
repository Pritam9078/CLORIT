/**
 * Signature Utilities
 * Helper functions for creating and verifying wallet signatures for admin actions
 */

export interface SignatureAction {
    type: string;
    projectId?: string;
    reason?: string;
    data?: Record<string, any>;
}

export interface SignatureResult {
    message: string;
    signature: string;
    timestamp: number;
    walletAddress: string;
}

/**
 * Create a formatted message for signing
 */
export const createSignatureMessage = (
    action: SignatureAction,
    walletAddress: string
): string => {
    const timestamp = Date.now();
    const lines = [
        '═══════════════════════════════════',
        '   CLORIT Admin Action Signature',
        '═══════════════════════════════════',
        '',
        `Action: ${action.type}`,
        `Wallet: ${walletAddress}`,
        `Timestamp: ${timestamp}`,
        `Date: ${new Date(timestamp).toISOString()}`,
        ''
    ];

    // Add action-specific details
    if (action.projectId) {
        lines.push(`Project ID: ${action.projectId}`);
    }

    if (action.reason) {
        lines.push(`Reason: ${action.reason}`);
    }

    if (action.data) {
        lines.push('', 'Additional Data:');
        Object.entries(action.data).forEach(([key, value]) => {
            lines.push(`  ${key}: ${value}`);
        });
    }

    lines.push(
        '',
        '═══════════════════════════════════',
        'By signing, you authorize this action.',
        '═══════════════════════════════════'
    );

    return lines.join('\n');
};

/**
 * Request signature from wallet
 */
export const requestSignature = async (
    message: string,
    walletAddress: string
): Promise<string> => {
    if (!window.ethereum) {
        throw new Error('No wallet detected');
    }

    try {
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, walletAddress]
        });

        return signature;
    } catch (error: any) {
        if (error.code === 4001) {
            throw new Error('Signature rejected by user');
        }
        throw error;
    }
};

/**
 * Sign an admin action
 */
export const signAction = async (
    action: SignatureAction,
    walletAddress: string
): Promise<SignatureResult> => {
    const message = createSignatureMessage(action, walletAddress);
    const signature = await requestSignature(message, walletAddress);
    const timestamp = Date.now();

    return {
        message,
        signature,
        timestamp,
        walletAddress
    };
};

/**
 * Format action for display
 */
export const formatActionForDisplay = (action: SignatureAction) => {
    const actionTitles: Record<string, string> = {
        'approve_project': 'Approve Project',
        'reject_project': 'Reject Project',
        'update_status': 'Update Project Status',
        'issue_credits': 'Issue Carbon Credits',
        'admin_approval': 'Admin Final Approval',
        'bulk_approve': 'Bulk Approve Projects',
        'flag_audit': 'Flag for Audit'
    };

    const actionDescriptions: Record<string, string> = {
        'approve_project': 'Approve this blue carbon project and proceed with verification',
        'reject_project': 'Reject this project with the specified reason',
        'update_status': 'Update the verification status of this project',
        'issue_credits': 'Issue carbon credits to the project owner',
        'admin_approval': 'Provide final ADMIN approval and mint carbon credits',
        'bulk_approve': 'Approve multiple projects in a single action',
        'flag_audit': 'Flag this project for manual audit review'
    };

    return {
        title: actionTitles[action.type] || action.type,
        description: actionDescriptions[action.type] || 'Perform admin action',
        details: {
            'Action Type': action.type,
            ...(action.projectId && { 'Project ID': action.projectId }),
            ...(action.reason && { 'Reason': action.reason }),
            ...action.data
        }
    };
};

/**
 * Verify signature format (client-side check)
 */
export const isValidSignatureFormat = (signature: string): boolean => {
    // Ethereum signatures are 132 characters (0x + 130 hex chars)
    return /^0x[a-fA-F0-9]{130}$/.test(signature);
};

/**
 * Get stored wallet address
 */
export const getStoredWalletAddress = (): string | null => {
    return localStorage.getItem('walletAddress');
};

/**
 * Get preferred wallet type
 */
export const getPreferredWallet = (): string | null => {
    return localStorage.getItem('preferredWallet');
};

/**
 * Store wallet information
 */
export const storeWalletInfo = (address: string, walletType: string): void => {
    localStorage.setItem('walletAddress', address);
    localStorage.setItem('preferredWallet', walletType);
};

/**
 * Clear wallet information
 */
export const clearWalletInfo = (): void => {
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('preferredWallet');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
};

export default {
    createSignatureMessage,
    requestSignature,
    signAction,
    formatActionForDisplay,
    isValidSignatureFormat,
    getStoredWalletAddress,
    getPreferredWallet,
    storeWalletInfo,
    clearWalletInfo
};
