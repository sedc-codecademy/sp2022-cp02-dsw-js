// import ProductCard from "./product-card.component";

// export default class RandomProductRendering {
//   static async render({ request: { resource }, data }) {
//     const products = await data;
//     console.log("Products", products)

//     const random12Products = [...Array(products.length).keys()].sort(() => 0.5 - Math.random()).slice(0, 12).map(index => products[index]);
//     console.log("random12Products", random12Products)
//     random12Products.map((product) => {
//       // console.log(ProductCard.render(product))
//       return ProductCard.render(product);
//     })
//       .join("");

//     return `
//       <section style="width: 100% ;" class="py-5">
//         <div style="width: 100% justify-content: center ;" class='container px-4 px-lg-5 mt-5'>
//           <div class="row__products gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center">
//               ${random12Products}
//           </div>
//         </div>
//       </section>
//     `

//   }
// }