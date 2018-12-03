export class Product {
	constructor(
		public name: string,
		public price: number,
		public description: string,
		public shopId: string,
		public id?: number
	) {}
}