const url = 'https://docs.google.com/spreadsheets/d/1HiQOgi54P2Bh-_atuIecvG95oREhvVweL-zHhkZFygA/edit#gid=0';

function doGet() {
  return render()
}

function render(section = "dashboard") {
  var index = HtmlService.createTemplateFromFile('index');
  index.view = section;
  var template = index.evaluate();
  template.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  template.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  return template;
}

function renderContent(section = "dashboard") {
  return render(section).getContent();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function submitProduct(form) {
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Inventory Log");
  const { product_name, product_unit_price, product_quantity } = form;
  const product = ["PURCHASE", `${product_name} (${product_unit_price}/-)`, product_unit_price, product_quantity, new Date()];
  ws.appendRow(product);
  Logger.log("Added product to inventory :" + JSON.stringify(product));
}

function getAvailableProducts() {
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Available Inventory");
  const data = ws.getRange(2, 1).getDataRegion().getValues();
  return data.map(d => ({
    name: d[0],
    price: d[1],
    quantity: d[2]
  })).slice(1);
}