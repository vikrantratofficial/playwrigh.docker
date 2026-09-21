# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: order\create-order.spec.js >> Customer Order Creation >> creates an order end to end (basic details -> order details -> place order)
- Location: tests\order\create-order.spec.js:22:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"] [role="option"]').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e6]:
      - button [ref=e8] [cursor=pointer]
      - generic [ref=e13]:
        - button "Select Theme" [ref=e14] [cursor=pointer]
        - button "" [ref=e15] [cursor=pointer]
        - generic [ref=e17]:
          - button "C Customer UCC" [ref=e18] [cursor=pointer]:
            - generic [ref=e19]:
              - generic [ref=e20]: C
              - generic [ref=e21]:
                - generic [ref=e22]: Customer
                - generic [ref=e23]: UCC
          - text: 󰀉 󰌾 󰍃
  - generic [ref=e24]:
    - generic [ref=e25]:
      - link "FIRLO":
        - /url: /UCCDEV
        - generic:
          - img "FIRLO"
      - text: 
    - list [ref=e27]:
      - listitem [ref=e28]:
        - link " Customer " [expanded] [ref=e29] [cursor=pointer]:
          - /url: /UCCDEV/customer-order-creation
          - generic [ref=e30]: 
          - generic [ref=e31]: Customer
          - generic [ref=e32]: 
        - list [ref=e35]:
          - listitem [ref=e36]:
            - link "Customer Order Creation" [ref=e37] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e38]:
            - link "Vehicle Allocation" [ref=e39] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e40]:
            - link "Customer Transporter Mapping" [ref=e41] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e42]:
            - link "Customer Dashboard" [ref=e43] [cursor=pointer]:
              - /url: "#"
      - listitem [ref=e44]:
        - link " Dashboard " [ref=e45] [cursor=pointer]:
          - /url: /UCCDEV/customer-order-creation
          - generic [ref=e46]: 
          - generic [ref=e47]: Dashboard
          - generic [ref=e48]: 
      - listitem [ref=e50]:
        - link " Master " [ref=e51] [cursor=pointer]:
          - /url: /UCCDEV/customer-order-creation
          - generic [ref=e52]: 
          - generic [ref=e53]: Master
          - generic [ref=e54]: 
      - listitem [ref=e56]:
        - link " Sequencing " [ref=e57] [cursor=pointer]:
          - /url: /UCCDEV/customer-order-creation
          - generic [ref=e58]: 
          - generic [ref=e59]: Sequencing
          - generic [ref=e60]: 
  - generic [ref=e63]:
    - generic [ref=e65]:
      - generic [ref=e68]:
        - heading "Order Creation" [level=4] [ref=e69]
        - list [ref=e71]:
          - listitem [ref=e72]:
            - link "Customer" [ref=e73] [cursor=pointer]:
              - /url: /UCCDEV/customer-order-creation
          - listitem [ref=e74]: 󰅂 Order Creation
      - generic [ref=e75]:
        - generic [ref=e76]:
          - button "1 Basic Details Plant, bill to & ship to" [disabled] [ref=e78]:
            - generic [ref=e79]: "1"
            - generic [ref=e80]:
              - generic [ref=e81]: Basic Details
              - generic [ref=e82]: Plant, bill to & ship to
          - button "2 Order Details Material, date & quantity" [disabled] [ref=e83]:
            - generic [ref=e84]: "2"
            - generic [ref=e85]:
              - generic [ref=e86]: Order Details
              - generic [ref=e87]: Material, date & quantity
          - button "3 Place Order Incoterm & confirmation" [disabled] [ref=e88]:
            - generic [ref=e89]: "3"
            - generic [ref=e90]:
              - generic [ref=e91]: Place Order
              - generic [ref=e92]: Incoterm & confirmation
        - generic [ref=e93]:
          - generic [ref=e95]:
            - generic [ref=e96]:
              - generic [ref=e97]:
                - heading "Party & plant" [level=2] [ref=e98]
                - generic [ref=e99]: The plant filters both party lists
              - generic [ref=e101]:
                - generic [ref=e102]:
                  - generic [ref=e103]: Plant*
                  - generic [ref=e104]:
                    - generic [ref=e105]: 
                    - generic [ref=e107]:
                      - log [ref=e109]
                      - generic [ref=e111] [cursor=pointer]:
                        - generic [ref=e112]: UCC
                        - combobox [ref=e114]
                - generic [ref=e122]:
                  - generic [ref=e123]: Bill To Party*
                  - generic [ref=e124]:
                    - generic [ref=e125]: 
                    - generic [ref=e127]:
                      - log [ref=e129]
                      - generic [ref=e131] [cursor=pointer]:
                        - generic [ref=e132]: Select bill to party
                        - combobox [ref=e134]
                - generic [ref=e139]:
                  - generic [ref=e140]: Ship To Party*
                  - generic [ref=e141]:
                    - generic [ref=e142]: 
                    - generic:
                      - log
                      - generic: Select a bill to party first
            - generic [ref=e144]:
              - generic [ref=e145]: All three are needed before the material list can be fetched.
              - button " Find Materials" [disabled] [ref=e146]:
                - generic [ref=e147]: 
                - text: Find Materials
          - complementary [ref=e148]:
            - generic [ref=e149]:
              - heading "Order so far" [level=2] [ref=e150]
              - generic [ref=e151]:
                - generic [ref=e152]: Plant
                - generic [ref=e153]: UCC
              - generic [ref=e154]:
                - generic [ref=e155]: Bill To Party
                - generic [ref=e156]: Not set
              - generic [ref=e157]:
                - generic [ref=e158]: Ship To Party
                - generic [ref=e159]: Not set
      - region "Notifications Alt+T"
    - contentinfo [ref=e160]:
      - generic [ref=e161]: © All Rights Reserved. firlo.io
```

# Test source

```ts
  1   | const { BasePage } = require('./base.page');
  2   | 
  3   | class CustomerOrderCreationPage extends BasePage {
  4   |   /**
  5   |    * @param {import('@playwright/test').Page} page
  6   |    */
  7   |   constructor(page) {
  8   |     super(page);
  9   |     this.heading = page.getByRole('heading', { name: 'ORDER CREATION' });
  10  | 
  11  |     // Step 1 - Basic Details
  12  |     this.billToPartyControl = this.dropdownControl('Bill To Party');
  13  |     this.shipToPartyControl = this.dropdownControl('Ship To Party');
  14  |     this.findMaterialsButton = page.getByRole('button', { name: 'Find Materials' });
  15  | 
  16  |     // Step 2 - Order Details
  17  |     this.materialOptions = page.locator('button.oc-mat');
  18  |     this.deliveryDateInput = page.locator('input.flatpickr-input');
  19  |     this.quantityInput = page.locator('input[placeholder="Enter quantity"]');
  20  |     this.continueButton = page.getByRole('button', { name: 'Continue' });
  21  | 
  22  |     // Step 3 - Place Order
  23  |     this.incotermControl = this.dropdownControl('Incoterm');
  24  |     this.placeOrderButton = page.locator('button.oc-btn-go', { hasText: 'Place Order' });
  25  | 
  26  |     // Confirmation screen
  27  |     this.orderPlacedHeading = page.getByRole('heading', { name: 'Order placed' });
  28  |     this.orderReferenceBlock = page.locator('.oc-done__ref');
  29  |     this.createAnotherOrderButton = page.getByRole('button', { name: 'Create another order' });
  30  |   }
  31  | 
  32  |   async isDisplayed() {
  33  |     return this.heading.isVisible();
  34  |   }
  35  | 
  36  |   /**
  37  |    * Locates a labelled react-select control by the visible label text next to
  38  |    * it (e.g. "Bill To Party", "Incoterm"), rather than its auto-generated
  39  |    * react-select-N id, which can shift if the page layout changes.
  40  |    */
  41  |   dropdownControl(labelText) {
  42  |     return this.page
  43  |       .locator('span.oc-label, div.oc-slot__k', { hasText: labelText })
  44  |       .locator('xpath=ancestor::div[1]')
  45  |       .locator('.oc-select');
  46  |   }
  47  | 
  48  |   /** The options of whichever react-select dropdown is currently open. */
  49  |   get openDropdownOptions() {
  50  |     return this.page.locator('[role="listbox"] [role="option"]');
  51  |   }
  52  | 
  53  |   /** Opens a dropdown and picks the option at `index` (0 = first available). */
  54  |   async selectDropdownOption(control, index = 0) {
  55  |     await control.click({ force: true });
> 56  |     await this.openDropdownOptions.first().waitFor({ state: 'visible' });
      |                                            ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  57  |     await this.openDropdownOptions.nth(index).click();
  58  |   }
  59  | 
  60  |   async selectBillToParty(index = 0) {
  61  |     await this.selectDropdownOption(this.billToPartyControl, index);
  62  |   }
  63  | 
  64  |   async selectShipToParty(index = 0) {
  65  |     await this.selectDropdownOption(this.shipToPartyControl, index);
  66  |   }
  67  | 
  68  |   async findMaterials() {
  69  |     await this.findMaterialsButton.click();
  70  |   }
  71  | 
  72  |   async selectMaterial(index = 0) {
  73  |     await this.materialOptions.nth(index).click();
  74  |   }
  75  | 
  76  |   async fillDeliveryDate(dateString) {
  77  |     await this.deliveryDateInput.fill(dateString);
  78  |   }
  79  | 
  80  |   async fillQuantity(quantity) {
  81  |     await this.quantityInput.fill(String(quantity));
  82  |   }
  83  | 
  84  |   async continueToReview() {
  85  |     await this.continueButton.click();
  86  |   }
  87  | 
  88  |   async selectIncoterm(index = 0) {
  89  |     await this.selectDropdownOption(this.incotermControl, index);
  90  |   }
  91  | 
  92  |   async placeOrder() {
  93  |     await this.placeOrderButton.click();
  94  |   }
  95  | 
  96  |   /** Reads the order number (e.g. "ORD-2026-00000097") off the confirmation screen. */
  97  |   async getOrderNumber() {
  98  |     const text = await this.orderReferenceBlock.innerText();
  99  |     const match = text.match(/ORD-\d{4}-\d+/);
  100 |     return match ? match[0] : null;
  101 |   }
  102 | 
  103 |   /**
  104 |    * Runs the full 3-step wizard end to end. Always picks the first available
  105 |    * Bill To Party / Ship To Party / Material / Incoterm rather than a
  106 |    * hardcoded code, so the test never depends on specific master data
  107 |    * existing in a given environment.
  108 |    */
  109 |   async createOrder({ quantity, deliveryDate }) {
  110 |     await this.selectBillToParty(0);
  111 |     await this.selectShipToParty(0);
  112 |     await this.findMaterials();
  113 |     await this.selectMaterial(0);
  114 |     await this.fillDeliveryDate(deliveryDate);
  115 |     await this.fillQuantity(quantity);
  116 |     await this.continueToReview();
  117 |     await this.selectIncoterm(0);
  118 |     await this.placeOrder();
  119 |   }
  120 | }
  121 | 
  122 | module.exports = { CustomerOrderCreationPage };
  123 | 
```