import { Exception } from "./api.exception"

/**
 * Création d'une 404
 */
export class NotFoundException extends Exception {
    /**
     * On appelle le `constructor` de la classe parente `Exception`
     */
    constructor(error: any) {
      super(error, 404)
    }
  }
  
  /**
   * Création d'une 400
   */
  export class BadRequestException extends Exception {
    /**
     * On appelle le `constructor` de la classe parente `Exception`
     */
    constructor(error: any) {
      super(error, 400)
    }
  }