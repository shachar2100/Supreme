/**
* boty.js -> is a bot that navigates through the supreme store , adds to cart tee's and purchases them.
* Coder: Shachar Habusha
* Date: 4/14/2021
* Delay: 1000 -> 1 sec (When clicking checkout)
**/

/**
* ToDo:
 * 1. Make finding product in home page
 * cartAdd(page,productName,productColor)
 * 2.Find out how to make multiple tabs that add to cart
 *  can you do it using Pages?
 * 3.What happens when one of the product you want to add is soldOut?
 * 4.Make Changing product size a function
 * Good Luck :)
 **/


const puppeteer =require('puppeteer-extra')

// add recaptcha plugin and provide it your 2captcha token (= their apiKey)
// 2captcha is the builtin solution provider but others would work as well.
// Please note: You need to add funds to your 2captcha account for this to work
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: '', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
  })
)

const chromeOptions = {
  executablePath:"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  headless:false, 
  slowMo:15,
  ignoreDefaultArgs: ["--enable-automation"],
  defaultViewport: null,
  //devtools:true,
  ignoreHTTPSErrors: true,
};

/**
 * Fill out checkout with your info
 */

const checkout = {
	name:"",
	email: "",
	phoneN: "",
	billA: "",
	zip:"",
	city:"",
	state:"",
	country:"",
	credit_card_num:"",
	credit_card_month:"",
	credit_card_year:"",
	credit_card_cvv:"", 
};



puppeteer.launch(chromeOptions).then(async (browser) => {
  
  var t0 = Date.now();  //Calculating RunTime  

  /**
  * Page 1:
  **/
  const page = await browser.newPage();
  await page.goto('https://www.supremenewyork.com/shop/all'); //Go to all Supreme Website


  try{
	  

	  /**
	  * This part will find the index of the name of product 
	  **/ 

  		const pathC1 = await page.evaluate(() => {

  			const product_Name = ""; // product of choice
  			const product_Color =""; // Color of choice
	  		var index;

	  		for(index = 1; index < 100; index++){

	  			
	  			var path_Name = '#container > li:nth-child(' + index + ') > div > div.product-name';
	  			var path_Color = '#container > li:nth-child(' + index + ') > div > div.product-style';	  			

	  			   
				var name =  document.querySelector(path_Name).textContent;			 
				var color =  document.querySelector(path_Color).textContent;  
	  			
	  			
	  			if(name.includes(product_Name) && color == product_Color){

	  				return path_Name;
	  					
	  			}
	  			
	  		} 


	  		return -1;
  		});

  		await page.click(pathC1), // Clicking the link will indirectly cause a navigation 
	  		
	   /**
	   * Clicks into the given path:
	   

	   await Promise.all([
		  page.waitForNavigation({ waitUntil: ['networkidle0'] }), // The promise resolves after navigation has finished
		  page.click(pathC1), // Clicking the link will indirectly cause a navigation 
		  //page.mouse.click(400,300), // Clicking the link will indirectly cause a navigation
	   ]);
**/
		//takes screen shot of product:)
	   await page.screenshot({ path: 'product.png' });
	   console.log('Location:', pathC1); // prints on cmd	


	   /*
	   * Change size to large
	   */   
   		
  		
  		const pathS1 = await page.evaluate(() => {  			
  			

  			const product_Size = ""; // Size of product
  			
	  		var index;

	  		for(index = 1; index < 5; index++){

	  			
	  			var path_Size = '#s > option:nth-child(' + index + ')';
	  				  			

	  			   
				var size =  document.querySelector(path_Size).textContent;			 
				  
	  			
	  			
	  			if(size == product_Size ){

	  				return document.querySelector(path_Size).value;
	  					
	  			}
	  			
	  		} 

	  		return -1;
  		});   

  		
  		
		await page.select('select#s', pathS1); 
	 

		//takes screen shot of product:)
	   await page.screenshot({ path: 'productSize.png' });

	   console.log('Path for size:', pathS1);	

	 



	   /*
	   * Add it to cart
	   */
	    //document.querySelector("#add-remove-buttons > input")
		   
		await page.click("#add-remove-buttons > input");
	   

	    //takes screen shot when added to cart:)
	    await page.screenshot({ path: 'added.png' });


	    /*
	    * Checks out: :)
	    */
	   
	   /*
	    await Promise.all([
		  page.waitForNavigation({ waitUntil: ['networkidle0'] }), // The promise resolves after navigation has finished
		  page.click('#cart > a.button.checkout'), // Clicking the link will indirectly cause a navigation 
	   ]);
		*/
		await page.click('#cart > a.button.checkout'); // Clicking the link will indirectly cause a navigation 

	    //takes screen shot when ready to check out:)
	    await page.screenshot({ path: 'cart.png' });

	    /**
		 *  Inserts Info into cart
		**/
			 /**
			 *  Name:
			 *  Path_Name(js): document.querySelector("#order_billing_name")
			 **/
			await page.type('#order_billing_name', checkout.name); 

			 /**
			 *  Email:
			 *	Path_Name(js): document.querySelector("#order_email")
			 **/
			await page.type('#order_email', checkout.email); 

			 /**
			 *  Phone#:
			 *	Path_Name(js): document.querySelector("#order_tel")
			 **/
			await page.type('#order_tel', checkout.phoneN); 


			 /**
			 *  Billing_Address:
			 *	Path_Name(js): document.querySelector("#bo")
			 **/
			await page.type('#bo', checkout.billA); 

			 /**
			 *  Apartmint Unit,etc:
			 *	Path_Name(js): document.querySelector("#oba3")
			 **/
			 //NONE FOR PERSONAL

			 /**
			 *  ZipCode:
			 *	Path_Name(js): document.querySelector("#order_billing_zip")
			 **/
			await page.type('#order_billing_zip', checkout.zip); 

			 /**
			 *  City:
			 *	Path_Name(js): document.querySelector("#order_billing_city")
			 **/
			await page.type('#order_billing_city', checkout.city); 


			 /**
			 *  State(DropDown):
			 *	Path_Name(js):document.querySelector("#order_billing_state")
			 **/
			await page.select('select#order_billing_state', checkout.state);

			 /**
			 *  Country(DropDown):
			 *	Path_Name(js):document.querySelector("#order_billing_country")
			 **/
			await page.select('select#order_billing_country', checkout.country);

			 /**
			 *  CreditCard#:
			 *	Path_Name(js):document.querySelector("#rnsnckrn")
			 **/
			await page.type('#rnsnckrn', checkout.credit_card_num); 


			 /**
			 *  CreditCardLastMonth(DropDown):
			 *	Path_Name(js):document.querySelector("#credit_card_month")
			 **/
			await page.select('select#credit_card_month', checkout.credit_card_month);

			 /**
			 *  CreditCardLast(DropDown):
			 *	Path_Name(js):document.querySelector("#credit_card_year")
			 **/
			await page.select('select#credit_card_year', checkout.credit_card_year); 

			 /**
			 *  CreditCardCVV:
			 *	Path_Name(js):document.querySelector("#orcer")
			 **/
			await page.type('#orcer', checkout.credit_card_cvv); 			 

			 /**
			 *  TermCheckBox:
			 *	Path_Name(js):document.querySelector("#terms-checkbox > label > div")
			 **/
			
			page.click('#terms-checkbox > label > div',)   
	 
		

	   


	   /**
	   * CheckOut Button
	   *document.querySelector("#pay > input")
	   **/

	   await new Promise(resolve => setTimeout(resolve, 3000)); // delays 

	   await page.click('#pay > input',{delay:20});

	     // That's it, a single line of code to solve reCAPTCHAs 🎉
	     console.log('Looking for reCAPTCHAs');
	     try{

			  await page.solveRecaptchas();
			  await page.click(`#recaptcha-demo-submit`)
			 
			}catch(err){
				console.log('N0 reCAPTCHAs :)', err.messagee);
			}

  		await page.screenshot({ path: 'response.png', fullPage: true })

	  

	   	     /**
			 *  TermCheckBox:
			 *	Path_Name(js):document.querySelector("#terms-checkbox > label > div")
			 **/
			
			page.click('#terms-checkbox > label > div',) 

			//Checkout
			await new Promise(resolve => setTimeout(resolve, 3000)); 
	        await page.click('#pay > input'); 



	    var t1 = (Date.now() - t0)/(1000); // Calculating runtime
	   console.log('Execution time(Seconds): ', t1);

   }catch(err){
   		await browser.close();
   		 console.log('Error:', err.message);	
   }


})



