$(document).ready(function () {
$('#header').css('text-align', 'center');
$('#totalDollarsIn').css('text-align', 'center');

loadItems();

var itemSelected = "";
$('#itemOneButton').click(function() {
    itemSelected = $('#itemOneButton').val();
    showItemSelected(itemSelected);
        
});
$('#itemTwoButton').click(function() {
    itemSelected = $('#itemTwoButton').val();
    showItemSelected(itemSelected);
        
});

$('#itemThreeButton').click(function() {
    itemSelected = $('#itemThreeButton').val();
    showItemSelected(itemSelected);
        
});
$('#itemFourButton').click(function() {
    itemSelected = $('#itemFourButton').val();
    showItemSelected(itemSelected);
        
});           
    
$('#itemFiveButton').click(function() {
    itemSelected = $('#itemFiveButton').val();
    showItemSelected(itemSelected);
        
});
$('#itemSixButton').click(function() {
    itemSelected = $('#itemSixButton').val();
    showItemSelected(itemSelected);
        
});
$('#itemSevenButton').click(function() {
    itemSelected = $('#itemSevenButton').val();
    showItemSelected(itemSelected);
        
});
$('#itemEightButton').click(function() {
    itemSelected = $('#itemEightButton').val();
    showItemSelected(itemSelected);
        
});
$('#itemNineButton').click(function() {
    itemSelected = $('#itemNineButton').val();
    showItemSelected(itemSelected);
        
});

var totalMoneyIn = 0;
var quarterChange = "";
var dimeChange = "";
var nickelChange = "";
var pennyChange = "";
var totalChange = quarterChange + dimeChange + nickelChange + pennyChange;
var quarterCount = 0;
var dimeCount = 0;
var nickelCount = 0;
var pennyCount = 0;



$('#addDollar').click(function() {
totalMoneyIn = totalMoneyIn + 1;
quarterCount = quarterCount + 4;
showDeposit(totalMoneyIn);
}),  

$('#addQuarter').click(function() {
totalMoneyIn = totalMoneyIn + .25;
quarterCount = quarterCount + 1;
showDeposit(totalMoneyIn);
}),

$('#addDime').click(function() {
totalMoneyIn = totalMoneyIn + .10;
dimeCount = dimeCount + 1;
showDeposit(totalMoneyIn);
}),   

$('#addNickel').click(function() {
totalMoneyIn = totalMoneyIn + .05;
nickelCount = nickelCount + 1;
showDeposit(totalMoneyIn);

});

$('#makePurchase').click(function() {
    totalMoneyDeposited = $('#totalDollarsInBox').val();
    itemSelected = $('#itemSelectedBox').val();
    makePurchase(totalMoneyDeposited, itemSelected);
});

$('#resetButton').click(function () {
    document.location.reload(true);
});

$('#changeReturnButton').click(function() {
            var paymentEntered = $('#totalDollarsInBox').val();
        if (paymentEntered > 0) {
            
            var changeReturn = "Quarters: " + quarterCount + "," + " Dimes: " + dimeCount + "," + " Nickels: " + nickelCount + "," + " Pennies: " + pennyCount;
            //var arrayChangeReturn = JSON.stringify(["Quarters: " + quarterCount, " Dimes: " + dimeCount, " Nickels: " + nickelCount, " Pennies: " + pennyCount]);
            //var changeReturnNoBracketOne = arrayChangeReturn.replace("[", "");
            //var changeReturnNoBracketTwo = changeReturnNoBracketOne.replace("]", "");
            //var changeReturn = changeReturnNoBracketTwo.replace(/"/g, "");
            $('#changeBox').val(changeReturn);
            $('#messageBox').val("Your change has been returned.");
            emptyPayment(quarterCount, dimeCount, nickelCount);
            totalMoneyIn = 0;
            $('#itemSelectedBox').val("");
            $('#makePurchase').hide();
            $('#changeReturnButton').hide();
            $('#resetButton').show();
            loadItems();
        }else{
            $('#messageBox').val("");
            $('#changeBox').val("");
            emptyPayment();
            loadItems();
    }
});

function emptyPayment() {
    $('#totalDollarsInBox').val(0);
    quarterCount = 0;
    dimeCount = 0;
    nickelCount = 0;
    totalMoneyIn = 0;
}

function makePurchase(totalMoneyDeposited, itemSelected) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/money/'+totalMoneyDeposited+'/item/'+ itemSelected,
        success: function (itemInfo) {
            var change = "Quarters: " + itemInfo.quarters + "," + " Dimes: " + itemInfo.dimes + "," + " Nickels: " + itemInfo.nickels + "," + " Pennies: " + itemInfo.pennies;
            //var arrayChange = JSON.stringify(["Quarters: " + itemInfo.quarters, " Dimes: " + itemInfo.dimes, " Nickels: " + itemInfo.nickels, " Pennies: " + itemInfo.pennies]);
            //var changeNoBracketOne = arrayChange.replace("[", "");
            //var changeNoBracketTwo = changeNoBracketOne.replace("]", "");
            //var change = changeNoBracketTwo.replace(/"/g, "");
            $('#changeBox').val(change);
            $('#messageBox').val("Thank You!");
            $('#changeReturnButton').hide();
            $('#makePurchase').hide();
            $('#resetButton').show();
                },
        statusCode: {
            422: function (errorMessage) {
                var fullMessage = errorMessage.responseText;
                var eMessage = JSON.parse(fullMessage);
                $('#messageBox').val(eMessage["message"]);
                }
                }
            })
        }
    }) 

function showItemSelected(itemSelected) {

    $('#itemSelectedBox').val(itemSelected);
}

function showDeposit(totalMoneyIn) {
    var totalDeposit = totalMoneyIn.toFixed(2);
    $('#totalDollarsInBox').val(totalDeposit);
}

function clearItems() {
    for (id=1; id <= 9; id++) {
        $('#button' + id + 'Id').empty();
        $('#button' + id + 'name').empty();
        $('#button' + id + 'price').empty();
        $('#button' + id + 'quantity').empty();
    }   
}

function loadItems() {
    clearItems();
    $('#totalDollarsInBox').val('');         
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/items',
            success: function (itemList) {
             $.each(itemList, function (index, item) {
                            var id = item.id;
                            var name = item.name;
                            var apiPrice = item.price;
                            var price = apiPrice.toFixed(2);
                            var quantity = item.quantity;

                                $('#button' + id + 'Id').append(id);
                                $('#button' + id + 'name').append(name);
                                $('#button' + id + 'price').append('$'+ price);
                                $('#button' + id + 'quantity').append('Quantity Left: ' + quantity);
                                                                                  
                        });   
                    },
            error: function () {
            $('#errorMessages')
                            .append($('<li>')
                                .attr({ class: 'list-group-item list-group-item-danger' })
                                .text('Error calling web service.  Please try again later.'));           
                    }
                })
            }   