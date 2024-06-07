const names = ["Perf", "Max", "Unit", "Test"];
const emails = ["note@ukr.net", "min@gmail.com", "mops@load.com", "now@wold.org"];
const addresses = ["Kiev Ukraine", "Rome Italy", "Madrid Spain", "Minsk Belarus"];

export const random_name = names[Math.floor(Math.random()*names.length)];
export const random_email = emails[Math.floor(Math.random()*emails.length)];
export const random_address = addresses[Math.floor(Math.random()*addresses.length)];