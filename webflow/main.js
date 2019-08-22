var days_per_month = 21.3;
var default_day_rate = 300;

function fmt_money(val) {
    return "R " + val.toLocaleString();
}

function fmt_perc(val) {
    return (val * 100).toFixed(0) + "%";
}

function updatePercentage(monthly_cost) {
    if (!monthly_cost) return;

    var monthly_income = default_day_rate;
    var period_income = parseInt($("#Budget").val());
    var payment_period = $("#Payment-Period").val()

    var period_income = period_income != "" ? period_income : default_day_rate;

    if (payment_period == "day") {
        monthly_income =  period_income * days_per_month;
    } else {
        monthly_income = period_income;
    }   

    var perc = monthly_income / monthly_cost;

    $(".percentage-covered").text(fmt_perc(perc));
    $(".expense-total").text(fmt_money(total_cost));
}

function updateCalculations(data) {
    var household_size = $("#household-size").data().from;
    var food_cost = $("#food-cost").data().from * household_size;
    var transport_coefficient = $("#Trip-type-2").val() == "one way" ? 1 : 2;
    var transport = $("#transport-cost").data().from * transport_coefficient;

    var household = $("#housing-cost").data().from;
    var utilities = $("#utilities-cost").data().from;
    var healthcare = $("#healthcare-cost").data().from * household_size;
    var hygiene = $("#hygiene-cost").data().from * household_size;
    var school_children = parseInt($("#School-going-children").val());
    var school = $("#education-cost").data().from * school_children;
    var communication = $("#communication-cost").data().from * household_size;
    var recreation = $("#recreation-cost").data().from * household_size;
    var other = $("#other-cost").data().from;

    var total_cost = food_cost + transport + household + utilities + healthcare + hygiene + school + communication + recreation + other;

    if (total_cost) {

        console.log(total_cost);
        updatePercentage(total_cost);
    }
}

$("#Trip-type-2").change(function(e) {
    updateCalculations();
})

$("#School-going-children").change(function(e) {
    updateCalculations();
})

$("#Payment-Period").change(function(e) {
    updateCalculations();
});

$("#Budget").change(function(e) {
    updateCalculations();
});
/*
$("#household-size").ionRangeSlider({
});
$("#food-cost").ionRangeSlider({
});
$("#transport-cost").ionRangeSlider({
});
$("#housing-cost").ionRangeSlider({
});
$("#utilities-cost").ionRangeSlider({
});
$("#healthcare-cost").ionRangeSlider({
});
$("#hygiene-cost").ionRangeSlider({
});
$("#education-cost").ionRangeSlider({
});
$("#communication-cost").ionRangeSlider({
});
$("#recreation-cost").ionRangeSlider({
});
$("#other-cost").ionRangeSlider({
});
*/
