export function transformMongoDocument(doc: any) {
  return JSON.parse(JSON.stringify(doc));
}
