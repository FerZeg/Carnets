export class BadRequestError extends Error {
	constructor(message, reasons = []) {
		super(message)
		this.name = "BadRequest"
		this.reasons = reasons
	}
}
export class UnauthorizedError extends Error {
	constructor(message, reasons = []) {	
		super(message)
		this.name = "Unauthorized"
		this.reasons = reasons
	}
}
export class NotFoundError extends Error {
	constructor(message, reasons = []) {
		super(message)
		this.name = "NotFound"
		this.reasons = reasons
	}
}
export class TokenExpiredError extends Error {
	constructor(message) {
		super(message)
		this.name = "TokenExpired"
	}
}
