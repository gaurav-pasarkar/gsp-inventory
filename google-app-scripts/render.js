const url = 'https://docs.google.com/spreadsheets/d/1HiQOgi54P2Bh-_atuIecvG95oREhvVweL-zHhkZFygA/edit#gid=0';

function doGet() {
  if(isUserAuthorised()) {
    const index = HtmlService.createTemplateFromFile('index');
    const template = index.evaluate();
    template.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    template.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return template;
  } else {
    const accessDenied = HtmlService.createTemplateFromFile('access_denied');
    const template = accessDenied.evaluate();
    template.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    template.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return template;
  }
}

function isUserAuthorised() {
  const ss = SpreadsheetApp.openByUrl(url);
  const ws = ss.getSheetByName("Authorised Users");
  const data = ws.getRange(2, 1).getDataRegion().getValues();
  const authorisedUsers = data.slice(1).map(users => users[0]);
  return authorisedUsers.includes(Session.getActiveUser().getEmail());
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function submitProduct(form) {
  buySellProduct("PURCHASE", form);
}

function buySellProduct(action, { product_name, cost_price, selling_price, quantity }) {
  const generateHash = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);

  const ss = SpreadsheetApp.openByUrl(url);
  const ws = ss.getSheetByName("Inventory Log");
  const p = [action, product_name, cost_price, selling_price, quantity, new Date(), generateHash(`${product_name}_${cost_price}_${selling_price}`)];
  ws.appendRow(p);
  Logger.log(`${action} product :` + JSON.stringify(p));
}

function sellProducts(products = []) {

  const existingProducts = getAvailableProducts()
    .reduce((acc, a) => {
      acc[a.id] = a
      return acc;
    }, {})

  const notAvailableProducts = products.filter(p => !(existingProducts[p.id] && p.quantity <= existingProducts[p.id].quantity));
  if(notAvailableProducts.length > 0) {
    throw {
      type: 'QUANTITY_NOT_AVAILABLE',
      unavailableProducts: notAvailableProducts
    }
  } else {
    products.forEach(p => {
      buySellProduct("SALES", { ...existingProducts[p.id], quantity: - p.quantity });
    })
  }
}

function getAvailableInventory() {
  const ss = SpreadsheetApp.openByUrl(url);
  const ws = ss.getSheetByName("Available Inventory");
  const data = ws.getRange(2, 1).getDataRegion().getValues();
  return data.slice(1);
}

function getAvailableProducts() {
  return getAvailableInventory().map(d => ({
    id: d[0],
    product_name: d[1],
    cost_price: d[2],
    selling_price: d[3],
    quantity: d[4]
  }));
}