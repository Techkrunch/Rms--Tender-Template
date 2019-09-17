$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    if (window.location.hash == "#profile-updated") { $("#profile-updated").removeClass("hidden"); }
    $("#get-tender-index-btn").on("click", function() { window.location = $("#index-page-category").children("option:selected").val(); });
    $(".page-navigation-select").on("change", function() { window.location = $(this).children("option:selected").val(); });
    $(".toggle-hidden").on("click", function() { $(this).siblings().toggleClass("hidden");
        $(this).children("i").toggleClass("glyphicon-chevron-up glyphicon-chevron-down"); });
    $("#filter-tenders-btn").on("click", function() {
        var $filterStr = [];
        $(".filter-item").each(function(i, e) { if ($(e).children("option:selected").val() != "") { $filterStr.push($(e).children("option:selected").val()); } });
        if ($filterStr.length > 0) { $str = "tenders/" + $filterStr.join("/"); } else { $str = "tenders"; }
        window.location.assign($str);
    });
    $("#filter-companies-btn").on("click", function() {
        var $filterStr = [];
        $(".filter-item").each(function(i, e) { if ($(e).children("option:selected").val() != "") { $filterStr.push($(e).children("option:selected").val()); } });
        if ($filterStr.length > 0) { $str = "companies/" + $filterStr.join("/"); } else { $str = "companies"; }
        window.location.assign($str);
    });
    $(".add-picture-field").on("click", function() { $(this).parents(".form-group").siblings(".picture-group").last().after('\
			<div class="form-group picture-group">\
				<input class="form-control" name="add-picture[]" type="file" placeholder="Picture for the add"/>\
				<span class="help-block">Max Image size allowed 512kb. </span>\
			</div>\
		'); });
    if ($("#share-this-page").length > 0) { $("#share-this-page").jsSocials({ url: window.location.href, text: $(".share-title").text(), showLabel: false, showCount: "inside", shares: ["twitter", "facebook", "googleplus", "linkedin", "pinterest", "whatsapp"] }); }
    $(".fa-print.fa-1x").on("click", function() { $("#tender-description").printElement(); })
    if ($("#small-map").length > 0) { createMap("small-map"); }
    if ($(".put-bottom-pad").length > 0) { $(".put-bottom-pad").on("click", "i", function() { $(this).siblings("span").toggleClass("hidden") }); }
    if ($("#statistics-map").length > 0) { createMap("statistics-map"); }
    $(".select2").select2({ tags: "true", placeholder: "Select Tag(s)", allowClear: true });
    if ($("#contact-us-map").length > 0) { createMap("contact-us-map"); }
    $("#proceed-to-document-payment").on("click", function() { $("#send-to-email").text($("input[name='your-email']").val()); if ($("#alert-bid-document-msg").hasClass("hidden")) { $("#alert-bid-document-msg").removeClass("hidden");
            $("#submit-bid-document-registration").removeClass("hidden");
            $(this).addClass("hidden"); } });
    $("#bid-doc-registration-form").on("focusout", "input", function() { $("#alert-bid-document-msg").addClass("hidden");
        $("#submit-bid-document-registration").addClass("hidden");
        $("#proceed-to-document-payment").removeClass("hidden"); });
    $('#documents-info-form').on('show.bs.modal', function(event) { var button = $(event.relatedTarget); var docTitle = button.data('doc'); var docID = button.data('docid'); var docFee = button.data('price'); var modal = $(this);
        modal.find('#doc-title').text(docTitle);
        modal.find('#document-id').val(docID);
        modal.find('.document-fee').val(docFee);
        modal.find('.document-feeT').text(docFee); })
    $('#documents-info-form').on('hide.bs.modal', function(event) { $("#alert-bid-document-msg").addClass("hidden");
        $("#submit-bid-document-registration").addClass("hidden");
        $("#proceed-to-document-payment").removeClass("hidden");
        $("#bid-doc-registration-form")[0].reset(); });
    if ($("#latest-tenders-list").length > 0) { $("#latest-tenders-list").cycle({ fx: 'scrollUp', timeout: 1000, speed: 1500, pause: 1 }); }
    if ($("#latest-sponsored").length > 0) { $("#latest-sponsored").cycle({ fx: 'scrollUp', timeout: 1000, speed: 1500, pause: 1 }); }
    if ($('.gallery').length > 0) { $('.gallery').cycle({ fx: 'scrollLeft', timeout: 2000, speed: 1500, pause: 1 }); }
    if ($(".texteditor").length > 0) { $(".texteditor").jqte(); }
    if ($("#my-calendar").length > 0) { $("#my-calendar").fullCalendar({ header: { left: 'prev,next today', center: '', right: 'month,agendaWeek,agendaDay' }, hiddenDays: [0, 6], events: $eventsForUser, eventClick: function(event) { if (event.url) { window.open(event.url); return false; } }, eventLimit: true }) }
});
var createMap = function(div, ops) {
    var styles = [{ stylers: [{ hue: "#1063B6" }, { saturation: -70 }] }, { featureType: "administrative.country", stylers: [{ visibility: "off" }] }, { featureType: "road", elementType: "geometry", stylers: [{ lightness: 50 }, { visibility: "simplified" }] }];
    var styledMap = new google.maps.StyledMapType(styles, { name: "TenderSoko" });
    if (!ops) { ops = { center: new google.maps.LatLng(-1.234182, 36.870675), zoom: 15, disableDefaultUI: true, mapTypeControl: true, zoomControl: true, zoomControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM, }, mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_CENTER, style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, mapTypeIds: ['map_style', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID] }, mapTypeId: google.maps.MapTypeId.ROADMAP, } }
    var themap = new google.maps.Map(document.getElementById(div), ops);
    themap.mapTypes.set('map_style', styledMap);
    themap.setMapTypeId('map_style');
    if ($("#contact-us").length > 0) { ourposition(themap); }
    return themap;
}
var ourposition = function(m, pos) {
    var ourpos = new google.maps.LatLng(-1.234182, 36.870675);
    if (pos !== undefined) { ourpos = pos; }
    var animatedMarker = new google.maps.Marker({ position: ourpos, map: m, icon: { path: google.maps.SymbolPath.CIRCLE, strokeColor: '#075DB8', fillColor: '#06458A', strokeOpacity: 0.0, fillOpacity: 1 } });
    var workMarker = new google.maps.Marker({ position: ourpos, map: m, icon: { path: google.maps.SymbolPath.CIRCLE, fillColor: '#075DB8', fillOpacity: 0.9, strokeColor: '#075DB8', strokeWeight: 1, scale: 6 }, title: "TenderSoko Ltd. Offices" });
    var swapAnimate = false;

    function animateCircle() {
        var scale = 0;
        var fOpacity = 1;
        var scaleLen = 100;
        var steps = fOpacity / scaleLen;
        window.setInterval(function() {
            var icon = animatedMarker.getIcon();
            if (!swapAnimate) {
                scale++;
                icon['scale'] = scale;
                if ((icon['fillOpacity'] - steps) >= 0) { icon['fillOpacity'] = icon['fillOpacity'] - steps; }
                if (scale == scaleLen) { swapAnimate = true; }
            } else {
                scale--
                icon['scale'] = scale;
                icon['fillOpacity'] = icon['fillOpacity'] + steps;
                if (scale == 0) { swapAnimate = false; }
            }
            animatedMarker.set('icon', icon);
        }, 20);
    }
    animateCircle();
}