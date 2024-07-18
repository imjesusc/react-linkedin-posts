export class FailCreatePostException extends Error {
  constructor() {
    super("Fail to create post.");
  }
}
