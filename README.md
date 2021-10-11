### Cài đặt
npm i erp-ui-element  
  
Thêm 2 dòng sau vào file main.js  
import 'vue2-datepicker/index.css'  
require('erp-ui-element')  
(lưu ý: Nếu trong file main.js đã import file register.js cũ thì bỏ đi)  
update erp-ui-element@1.0.47

### Documents :  

## Breadcrumd
    <vue-bread-crumb :header="header" />  
    input: header  
    Ví dụ:  
    header: {
        title: "Giao phiếu báo hỏng",
        list: [
          { name: "Lập hợp đồng", link: { name: "Ui.cards" } },
          {
            name: "Lắp đặt mới",
            link: { name: "Ui.buttons" },
          },
        ],
    }  

## Card



