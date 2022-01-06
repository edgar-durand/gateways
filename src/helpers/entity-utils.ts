/**
 * Update entity values accord Dto
 * @param entity
 * @param dto
 */
export const mapFromDto = (entity: any, dto: any): void => {
  Object.keys(dto).forEach((key) => {
    entity[key] = dto[key];
  })
}