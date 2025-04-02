/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('images').del()
  await knex('images').insert([
    {id: 1, name: 'logo', image_url: '/Logo.jpg'},
    {id: 2, name: 'main-stripe', image_url: '/Main-Stripe.jpg'},
    {id: 3, name: 'main-cake', image_url: '/Main-Cake.jpg'},
  ]);
};
