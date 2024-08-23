export interface serverResponse {
    success: boolean,
    message: string,
    content: {
        name: string;
        role: string;
        roles: [];
        showLocation: [];
        showUnit: [];
        showMaster: [];
        showMaterial: [];
        showComplaintMaster: [];
        showComputerMaster: [];
        user_name: string;
        password: string;
        accessToken: string;
    };
}