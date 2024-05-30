export interface Mapper<I, O> {
  toDomain(raw: I): O;
  fromDomain(data: O): I;
}
