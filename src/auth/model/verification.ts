export class Verification {
    constructor(
        readonly id: string,
        readonly code: string,
        readonly email: string,
        readonly createdAt: Date
    ) {}
}

export interface VerificationDto {
    code: string
    verificationId: string
}