  /**
   * Verify pass param
   * @param pass pass to be verified
   * @returns true or false
   */
   export function verifyPass(pass: string): boolean {
    if (isNotNullOrUndefined(pass) && isValueLengthBetween(pass, 3, 100)) {
      return true;
    }

    return false;
  }

  /**
   * Verify username param
   * @param username username to be verified
   * @returns true or false
   */
   export function verifyUsername(username: string): boolean {
    if (isNotNullOrUndefined(username) && isValueLengthBetween(username, 5, 20)) {
      return true;
    }

    return false;
  }

   /**
   * Verify name param
   * @param name name to be verified
   * @returns true or false
   */
    export function verifyName(name: string): boolean {
      if (isNotNullOrUndefined(name) && isValueLengthBetween(name, 5, 80)) {
        return true;
      }
  
      return false;
    }

  /**
   * Verify desc param
   * @param desc desc to be verified
   * @returns true or false
   */
    export function verifyDescription(desc: string): boolean {
    if (isNotNullOrUndefined(desc) && isValueLengthBetween(desc, 5, 80)) {
      return true;
    }

    return false;
  }

  /**
   * Verify director param
   * @param director director to be verified
   * @returns true or false
   */
    export function verifyDirector(director: string): boolean {
      if (isNotNullOrUndefined(director) && isValueLengthBetween(director, 5, 30)) {
        return true;
      }

      return false;
    }


  /**
   * Verify director param
   * @param director director to be verified
   * @returns true or false
   */
  export function verifyParentRating(rating: string): boolean {
    if (isNotNullOrUndefined(rating) && isValueLengthBetween(rating, 2, 15)) {
      return true;
    }

    return false;
  }

  /**
   * Check if a value is null or undefined
   * @param value The value to check
   * @returns true if the value is not null or undefined, otherwise returns false
   */
  function isNotNullOrUndefined(value: any) {
    if (value != null && value != undefined) {
        return true;
    }

    return false;
  }

  /**
   * Check if a value length is between a given interval
   * @param value The value to check
   * @param minLength The minimum length
   * @param maxLength The maximum length
   * @returns true if the value is between minLength and maxLength, otherwise returns false
   */
  function isValueLengthBetween(value: any, minLength: number, maxLength: number) {
    if (value.length && value.length >= minLength && value.length <= maxLength) {
        return true;
    }

    return false;
  }