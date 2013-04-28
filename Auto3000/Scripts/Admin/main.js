
function popOpen(popCode) { $('body div:first').before('<div class="lightFrame">' + popCode + '<div>'); $('.pop').draggable(); stopDrag(".pop"); alignPop(); $('.fT').focus(); }; //open popup as draggable & stop.
function popClose() { $('.lightFrame').remove(); $('body').removeClass('crop'); }; //close popup
function startDrag(drager) { $(drager).draggable("option", "disabled", false) };
function stopDrag(drager) { $(drager).draggable("option", "disabled", true) };
function showAlert(title, message, width) { $('body div:first').before('<div class="lightFrame"><div class="pop"  style="width:' + width + 'px"><div class="popCore"><div class="heading"><span>' + title + '</span><div class="popMenu"><a href="javascript:void(0)" title="Close" class="close"><img src="/Content/images/icon_close.png" width="14" height="14" alt="Close"/></a></div></div><div class="popContent txC">' + message + '</div><div class="popFooter"><input type="submit" value="Ok" class="btnOk" onclick="popClose()"/></div></div></div><div>'); alignPop(); };
function alignPop() { $('body').addClass('crop'); margT = ($(window).height() - $('.pop').height()) / 2; pageTop = ($(document).scrollTop()); if (margT < 20) { margT = 20; } $('.pop').css({ 'margin-top': margT }); $('.lightFrame').css({ 'margin-top': pageTop }); }
function confirmPop(title, message, work) { $('body div:first').before('<div class="lightFrame"><div class="pop"><div class="popCore" style="width:420px"><div class="heading drag"><span>' + title + '</span><div class="popMenu"><a href="javascript:void(0)" title="Close" class="close"><img src="/Content/images/icon_close.png" width="14" height="14" alt="Close"/></a></div></div><div class="popContent txC">' + message + '</div><div class="popFooter"><div class="popBtnHolder"><input type="submit" onclick="' + work + ' popClose();" value="   Yes   " class="btn2 lft" id="proceed"/><input type="submit" value="   No   " onclick="popClose()" class="btn2 lft" id="cancel "/></div></div></div></div></div>'); alignPop(); };
$('.showThird,.headerMenu').live('mouseenter', function () { $('.headerMenu').stop().show(); });
$('.headerMenu,.title').live('mouseleave', function () { $('.headerMenu').stop().hide(); });
$('.pop .drag').live('mouseenter', function () { startDrag(".pop"); });
$('.pop .drag').live('mouseleave', function () { stopDrag(".pop"); });
$('.chk input').live('change', function () { $(this).parent().toggleClass('checked'); }); //	alert($(this).attr('checked'));
$('.radio input').live('change', function () { radioGroup = $(this).parent().parent().parent(); selected = $(radioGroup).find('input:checked'); $(radioGroup).find('a').removeClass('checked'); $(selected).parent().addClass('checked'); }); //	alert($(selected).val());
//function createCheck(){$('body input:checkbox').wrap('<a class="chk"></a>');};// Dynamic creation of special checkboxes
function disable(selector) { $(selector).attr('disabled', 'disabled'); }; //disabling the div elements
function enable(selector) { $(selector).removeAttr('disabled'); };
function reOrder(holder, element, triger, saveBtn, cancelBtn) {
    $('#' + triger).live('click', function () { before = $(holder).html(); block('.headBtn,.edtRow,.dltRow'); $(holder).sortable({ disabled: false, items: element, cursor: 'move', opacity: 0.6 }); $('#' + triger).parent().find('.headBtn').hide(); $('#' + triger).after('<a href="javascript:void(0)" class="headBtn" id="' + cancelBtn + '"><img src="/Content/images/reorderIcon.png" width="16" height="18" alt="Edit" />Cancel Re-order</a><a href="javascript:void(0)" class="headBtn" id="' + saveBtn + '"><img src="/Content/images/reorderIcon.png" width="16" height="18" alt="Edit" />Save Re-order</a>'); });
    $('#' + saveBtn + ', ' + '#' + cancelBtn).live('click', function () {
        $(holder).sortable({ disabled: true }); $('#' + saveBtn + ', ' + '#' + cancelBtn).remove(); $('.headBtn').show();
        unblock('.headBtn,.edtRow,.dltRow');
    });
    $('#' + cancelBtn).live('click', function () { $(holder).html(before); });
    $('#' + saveBtn).live('click', function () {
        order = ''; $(holder + ' ' + element).each(function () { order += ($(this).attr('id') + ','); });
        order = order.substring(0, (order.length - 1));
    });
};
function block(selector) { $(selector).addClass('disabled'); };
function unblock(selector) { $(selector).removeClass('disabled'); };
$('.disabled').live('mousedown', function () { showAlert('Access Denied.', 'Access Denied Temporary.', 450); return false; });
function setGridWidth(holder) {
    fxWidth = 0;
    css = '';
    spaceLeft = 0;
    cPercentage = 0;
    colCount = $(holder + ' ul:first li').size();
    totalWidth = ($(holder).width() - (colCount * 10) - (colCount - 1)); //totalPadding = (colCount*10);	totalBorder = (colCount+1);
    $(holder + ' ul:first li[fx]').each(function () {
        cWidth = eval($(this).attr('fx'));
        cIndex = ($(this).index() + 1);
        css += (holder + ' li:nth-child(' + cIndex + '){width:' + cWidth + 'px;} ');
        fxWidth += cWidth;
    });
    spaceLeft = totalWidth - fxWidth;
    $(holder + ' ul:first li[fl]').each(function () {
        cPercentage = eval($(this).attr('fl'));
        cIndex = ($(this).index() + 1);
        cWidth = (spaceLeft * cPercentage) / 100;
        css += (holder + ' li:nth-child(' + cIndex + '){width:' + cWidth + 'px;} ');
    });
    $('style:contains(' + holder + ' li)').remove();
    $('head').append('<style type="text/css">' + css + '</style>');
};
function resetGrid() {
    $('.gridCore:not(.customAlign)').each(function () {
        selectGrid = $(this).attr('class').split(' ')[1];
        setGridWidth('.' + selectGrid);
        $('.' + selectGrid).find('ul:not(.gridHead)').addClass('show');
    });
//    $('.gridCore li').each(function () {
//        $(this).text().toLowerCase();
//    });
//    $('.gridHead').each(function () {
//        maxHeight = 0;
//        $(this).find('li').each(function () {
//            newHeight = $(this).height();
//            if (newHeight > maxHeight) {
//                maxHeight = newHeight;
//            } //alert(maxHeight);
//        });
//        //alert($('.searchFinder .lft').height());
//        $(this).find('li').height(maxHeight);
//        $(this).height(maxHeight + 5);
//    });
    //searchFinisher();


};
/////dropdown/////////////////////
$('.subLevelSelector li').live('click', function () {
    newtitle = $(this).text();
    newId = $(this).attr('id');
    newP = $(this).parents('.subLevelSelector').find('input.selected');
    $(newP).addClass('valid').removeClass('input-validation-error');
    $(newP).attr('value', newtitle);
    $(newP).attr('name', newId);
    $('.bCloser').hide();
    return false;
});
$('.subLevelSelector .selected').live('click', function () {
    $(this).parent().find('li').removeClass('sel');
    $('.bCloser').hide();
    $('.subLevelSelector, .multiLevelSelector , .subLevelInput').css({ 'z-index': '10' });
    selected = $(this).attr('name');
    $('#' + selected).addClass('sel');
    $(this).parent().css({ 'z-index': '1000' });
    $(this).parent().find('ul').show();
    return false;
});
//$('.subLevelSelector li').live('click', function () {
//    newtitle = $(this).text();
//    newId = $(this).parent().attr('id');
//    $(this).parents('.subLevelSelector').find('input.selected').addClass('valid').removeClass('input-validation-error').attr('value', newtitle).attr('name', newId);
//    $('.bCloser').hide();
//    return false;
//});
//$('.subLevelSelector .selected').live('click', function () {
//    $('.bCloser').hide();
//    $('.subLevelSelector, .multiLevelSelector , .subLevelInput').css({ 'z-index': '10' });
//    $(this).parent().css({ 'z-index': '1000' });
//    $(this).parent().find('ul').show();
//    return false;
//});
$('body').live('click', function () {
    $('.bCloser').hide();
});
$('.subLevelSelector .selected').live('focus', function () {
    $('.bCloser').hide();
    $('.subLevelSelector, .multiLevelSelector').css({ 'z-index': '10' });
    $(this).parent().css({ 'z-index': '1000' });
    $(this).parent().find('ul').show();
    return false;
});
$('.multiLevelSelector li a').live('click', function () {
    newtitle = $(this).attr('name');
    newVal = $(this).text();
    $(this).parents('.multiLevelSelector').find('input.selected').addClass('valid').removeClass('input-validation-error').attr('name', newtitle).attr('value', newVal);
    $('.bCloser').hide();
});
$('.multiLevelSelector li').live('click', function () {
    return false;
});
$('.multiLevelSelector .selected').live('click', function () {
    $('.bCloser').hide();
    $('.subLevelSelector, .multiLevelSelector').css({ 'z-index': '10' });
    $(this).parent().css({ 'z-index': '1000' });
    $(this).parent().find('.multiFirst').show();
    return false;
});
$('.multiLevelSelector .selected').live('focus', function () {
    $('.bCloser').hide();
    $('.subLevelSelector, .multiLevelSelector , .subLevelInput').css({ 'z-index': '10' });
    $(this).parent().css({ 'z-index': '1000' });
    $(this).parent().find('.multiFirst').show();
    return false;
});
$('.subLevelInput li').live('click', function () {
    newtitle = $(this).text();
    newId = $(this).parent().attr('id');
    //  $(this).parents('.subLevelSelector').find('input.selected').addClass('valid').removeClass('input-validation-error');
    $(this).parents('.subLevelInput').find('input.selected').addClass('valid').removeClass('input-validation-error');
    $(this).parents('.subLevelInput').find('input.selected').attr('value', newtitle).attr('name', newId);
    $('.bCloser').hide();
    $(this).parents('.subLevelInput').find('img').show();
    $(this).parents('.subLevelInput').addClass('inactive');
    $(this).parents('.subLevelInput').find('input.selected').attr('disabled', 'disabled');
    return false;
});
$('.subLevelInput img').live('click', function () {
    $(this).hide();
    $(this).parents('.subLevelInput').removeClass('inactive');
    $(this).parents('.subLevelInput').find('input.selected').attr('value', ''); //.attr('name', '')
    $(this).parents('.subLevelInput').find('input.selected').removeAttr('disabled');
    $(this).parents('.subLevelInput').find('input.selected').select().focus();
    $(this).parents('.subLevelInput').find('input.selected').removeClass('valid').addClass('input-validation-error');
});
///////////////////////////////
$('.subLevelOther li').live('click', function () {
    $(this).parents('.disappHolder').find('.errorMessage').hide();
    $(this).parents('.subLevelOther').find('input.other').hide();
    newtitle = $(this).text();
    newId = $(this).attr('id');
    newP = $(this).parents('.subLevelOther').find('input.selected');
    $(newP).addClass('valid ').removeClass('input-validation-error').removeClass('otherSelected');
    $(newP).attr('value', newtitle);
    $(newP).attr('name', newId);
    if ($(this).hasClass('other')) {
        $(this).parents('.subLevelOther').find('input.other').val('').show().focus().select();
        $(newP).addClass('otherSelected');
    }
    $('.bCloser').hide();
    return false;
});
$('.subLevelOther .selected').live('click', function () {
    $(this).parent().find('li').removeClass('sel');
    $('.bCloser').hide();
    $('.subLevelSelector, .multiLevelSelector , .subLevelInput').css({ 'z-index': '10' });
    selected = $(this).attr('name');
    $('#' + selected).addClass('sel');
    $(this).parent().css({ 'z-index': '1000' });
    $(this).parent().find('ul').show();
    return false;
});
$('.subLevelOther .selected').live('focus', function () {
    $('.bCloser').hide();
    $('.subLevelSelector, .multiLevelSelector, .subLevelInput').css({ 'z-index': '10' });
    $(this).parent().css({ 'z-index': '1000' });
    $(this).parent().find('ul').show();
    return false;
});

$('.disappClose').live('click', function () {
    $('#' + disapprovalID).find('.approvedStatus').html('<div class="pending"><div class="main"><img  src="Content/images/pending.png" width="16" height="16" alt=""></div><div class="sub bCloser"><div class="subT app"><img class="approved" src="Content/images/approval.png" width="16" height="16" alt=""><span>Approved</span><div class="clr"> </div></div><div class="subT dis"><img class="disappoved" src="Content/images/disapproval.png" width="16" height="16" alt=""><span>Disapproved</span><div class="clr"> </div></div></div></div>');
    $('#' + disapprovalID).removeAttr('style');
    $('.approvedStatus').removeClass('disabled');
    $(this).parents('.disappHolder').find('.disapp').hide();
});
function disApprove(a) {
    $(a).parent().find('.errorMessage').addClass('okay').text('Thank you').show();
    $('#' + disapprovalID).find('.approvedStatus').html('<img class="approved" src="Content/images/disapproval.png" width="16" height="16" alt="">').attr('rel', 'disapproved');
    $('#' + disapprovalID).removeAttr('style');
    $('.approvedStatus').removeClass('disabled');
    $(a).parents('.disappHolder').find('.disapp').hide();
}
/////dropdown/////////////////////
$('.edtRowLive').live('click', function () {
    selectRow = ($(this).parent().parent());
    $('.edtRowLive').addClass('editRowDisabled').removeClass('edtRowLive');
    $('.dltRowLive').addClass('dltRowDisabled').removeClass('dltRowLive');
    rowBeforeEdit = selectRow.html();
    btnBeforeEdit = $(selectRow).find('li.liveEditSubmit').html();
    liveEdiTxt2 = ($(selectRow).find("li.liveEdiTxt2").text());
    liveEdiTxt3 = ($(selectRow).find("li.liveEdiTxt3").text());
    liveEditCheck = ($(selectRow).find('li.liveEditCheck img').attr('alt'));
    liveEditCheck2 = ($(selectRow).find('li.liveEditCheck2 img').attr('alt'));
    $(selectRow).find("li.liveEdiTxt2").replaceWith('<li class="liveEdiTxt2"><input type="text" value="' + ($(selectRow).find("li.liveEdiTxt2").text()) + '" /></li>');
    $(selectRow).find("li.liveEdiTxt3").replaceWith('<li class="liveEdiTxt3"><input type="text" value="' + ($(selectRow).find("li.liveEdiTxt3").text()) + '" /></li>');
    $(selectRow).find("li.liveEditCheck").replaceWith('<li class="liveEditCheck"><input type="checkbox" ' + ($(selectRow).find('li.liveEditCheck img').attr('alt')) + '/></li>');
    $(selectRow).find("li.liveEditCheck2").replaceWith('<li class="liveEditCheck2"><input type="checkbox" ' + ($(selectRow).find('li.liveEditCheck2 img').attr('alt')) + '/></li>');
    //liveEdiSmart1
    $(selectRow).find("li.liveEdiSmart1").replaceWith('<li class="liveEdiSmart1"><input type="text" value="' + ($(selectRow).find("li.liveEdiSmart1").text()) + '" /></li>');
    //submit/cancel
    $(selectRow).find("li.liveEditSubmit").replaceWith('<li class="liveEditSubmit"> <input type="button" value="Save" class="button lft saveEdit" /><input type="button" value="Cancel" class="button lft cancelEdit" /></li>');
});
///saving///////
//LIVE EDIT SAVE
$('.liveEditSubmit .saveEdit').live('click', function () { saveLiveEditRow() });
//textBox
function saveLiveEditRow() {
    $(selectRow).find("li.liveEdiTxt2").replaceWith('<li class="liveEdiTxt2">' + $(selectRow).find("li.liveEdiTxt2 input").attr('value') + '</li>');
    $(selectRow).find("li.liveEdiTxt3").replaceWith('<li class="liveEdiTxt3">' + $(selectRow).find("li.liveEdiTxt3 input").attr('value') + '</li>');
    //liveEdiSmart1
    $(selectRow).find("li.liveEdiSmart1").replaceWith('<li class="liveEdiSmart1">' + $(selectRow).find("li.liveEdiSmart1 input").attr('value') + '</li>');
    //list
    $(selectRow).find("li.liveEdiList2").replaceWith('<li class="liveEdiList2">' + ($(selectRow).find("li.liveEdiList2 select option:selected").text()) + '</li>');
    $(selectRow).find("li.liveEdiList3").replaceWith('<li class="liveEdiList3">' + ($(selectRow).find("li.liveEdiList3 select option:selected").text()) + '</li>');
    //checkbox 
    if ($(selectRow).find("li.liveEditCheck input").is(':checked'))
    { $(selectRow).find("li.liveEditCheck").replaceWith('<li class="liveEditCheck"><img src="/Content/images/tick.png" width="16" height="16" alt="checked=' + "'true'" + '"/></li>'); }
    else { $(selectRow).find("li.liveEditCheck").replaceWith('<li class="liveEditCheck" ><img src="/Content/images/cross.png" width="16" height="16" alt=""/></li>'); };
    if ($(selectRow).find("li.liveEditCheck2 input").is(':checked'))
    { $(selectRow).find("li.liveEditCheck2").replaceWith('<li class="liveEditCheck2"><img src="/Content/images/tick.png" width="16" height="16" alt="checked=' + "'true'" + '"/></li>'); }
    else { $(selectRow).find("li.liveEditCheck2").replaceWith('<li class="liveEditCheck2" ><img src="/Content/images/cross.png" width="16" height="16" alt=""/></li>'); };
    //btns
    $(selectRow).find("li.liveEditSubmit").replaceWith('<li class="liveEditSubmit"> ' + btnBeforeEdit + '</li>');
    //barcode
    $('.addNewRow').removeAttr('disabled');
    $('.editRowDisabled').addClass('edtRowLive').removeClass('editRowDisabled');
    $('.dltRowDisabled').addClass('dltRowLive').removeClass('dltRowDisabled');
};
//LIVE EDIT CANCEL
$('.liveEditSubmit .cancelEdit').live('click', function () {
    $(selectRow).replaceWith('<ul>' + rowBeforeEdit + '</ul>')
    rowBeforeEdit = '';
    $('.editRowDisabled').addClass('edtRowLive').removeClass('editRowDisabled');
    $('.dltRowDisabled').addClass('dltRowLive').removeClass('dltRowDisabled');
});
//DELETE ROW
$('.dltRowLive').live('click', function () {
    selectRow = ($(this).parent().parent());
    $(selectRow).remove();
});
////////////////////////////////////////////////
$('.mC li ').live('mouseover', function () {
    $('.leftBox ul li ul').hide();
    $(this).find('ul').show();
});
$('.mC li ').live('mouseout', function () {
    $('.leftBox ul li ul').hide();
});
/*
$('.tdLInner').live('mouseover', function () {
$(this).find('ul').show();
return false;
});
$('.tdLInner').live('mouseout', function () {
$(this).find('ul').hide();
return false;
});*/
$('.thrdLvl').live('click', function () {
    $('div.tdLInner').find('ul').slideToggle(100);
    $('.tgHldr span').toggleClass('spnCp spnEx');
    return false;
});
$('.tdLInner ul li').live('click', function () {
    $('.tdLInner ul').hide();
    return false;
});
$('.collapseHdr').live('click', function () {
    $('.headerPart.expand ').toggleClass('collapse expand');
    $('.headerPart').animate({ height: 0 }, 200, function () { });
    $('a.collapseHdr').toggleClass('collapseHdr expandHdr');
    $('.headerPart.collapse .headerLinks').find('span').hide();
});
$('.expandHdr').live('click', function () {
    $('.headerPart.collapse').toggleClass('collapse expand');
    $('.headerPart').animate({ height: 70 }, 200, function () { });
    $('a.expandHdr').toggleClass('collapseHdr expandHdr');
    $('.headerPart.expand .headerLinks').find('span').css({ 'display': 'block' });
});
$(".collapse .headerLinks").live('mouseenter', function () {
    $(this).find('span').show();
});
$(".collapse .headerLinks").live('mouseleave', function () {
    $(this).find('span').hide();
});
$('.mE li a.hvDrop').live('click', function () {
    $('.exAccord').slideUp();
    $(this).parent().find('.exAccord').stop();
    $(this).parent().find('.exAccord').slideToggle();
});
$('.tdLInner ul li').live('click', function () {
    $('.tdLInner ul').hide();
    return false;
});
$('.tdLInner ul li a').live('click', function () {
    window.location.href = $(this).attr('href');
});

// Language Tab
$('.rightArrow').live('click', function () {
    a = $(".languageHolder ul").position().left;
    if (a <= 0 && (a > (last * -1))) {
        $(".languageHolder ul").stop().animate({ left: "-=" + 540 }, 200, function () {
        });
    }
    else {
        $(".languageHolder ul").stop().animate({ left: +"-" + last }, 200, function () {
        });
        return false;
    }
});
$('.leftArrow').live('click', function () {
    a = $(".languageHolder ul").position().left;
    if (a < -300) {
        $(".languageHolder ul").stop().animate({ left: "+=" + 540 }, 200, function () {
        });
    }
    else if (a >= -300) {
        $(".languageHolder ul").stop().animate({ left: 0 }, 200, function () {
        });
        return false;
    }
});
$(".languageHolder li").live('click', function (e) {
    $(".languageHolder li").removeClass('selected');
    $(this).addClass('selected');

});
$(".languageHolder li").live('mouseover', function (e) {
    var c = $(this).find('em').text();
    if (c != "") {
        $("body").append("<div class='tip'>" + c + "</div>");
    }
    $(".tip").css({ "top": (e.pageY + 20) + "px", "left": (e.pageX + 20) + "px" }).show();
}).live('mouseout', function () {
    $(".tip").remove();
}).live('mousemove', function (e) {
    $(".tip").css({ "top": (e.pageY + 20) + "px", "left": (e.pageX + 20) + "px" });
});
//$('.openFav').live('click', function () {
//    $('.quickLink')/*s.find('ul')*/.slideToggle(200);
//    return false;
//});
/// Cookie Functions
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
/// Close Cookie Functions
function mExpand() {
    $('.mCollapse').toggleClass('mCollapse mExpand');
    $('.mE li ul.subColapsed').toggleClass('subColapsed subExpanded');
    $('ul.mC').toggleClass('mE mC');
    $('.wC').toggleClass('wC wE');
    resetGrid();
};
function mCollapse() {
    $('.mExpand').toggleClass('mCollapse mExpand');
    $('ul.mE').toggleClass('mE mC');
    $('.wE').toggleClass('wC wE');
    $('.leftBox ul li ul').hide();
    resetGrid();
};
$('.mCollapse').live('click', function () {
    mExpand();
    if (getCookie("LeftClickHit") != null) {
        setCookie("LeftClickHit", "Open", -1);
    }
    setCookie("LeftClickHit", "Open", 30);
});
$('.mExpand').live('click', function () {
    mCollapse();
    if (getCookie("LeftClickHit") != null) {
        setCookie("LeftClickHit", "Close", -1);
    }
    setCookie("LeftClickHit", "Close", 30);
});
function qlManage() { $(".quickLink ul").sortable({ disabled: false, items: 'li', revert: 100, delay: 200 }).selectable({ disabled: true }); };
function qlmanageStop() { $(".quickLink ul").sortable({ disabled: true }); };
function qlmanageStart() { $(".quickLink ul").sortable({ disabled: false }); };
lock = true;
$('.quickLink .move .closeX').live('click', function () {
    $(this).parent().find('a').fadeOut(500);
    $(this).parent().fadeOut(1000).remove();
});
//$('.manageQuickLink').live('click', function () {
//    qlManage();
//    $(".quickLink ul").addClass('move');
//    $(this).replaceWith('<a href="javascript:void(0)" class="rgt saveQuickLink mR60">Finish</a>');
//    //$('.quickBox').stop().fadeIn();
//    lock = false;
//});
//$('.saveQuickLink').live('click', function () {
//    qlmanageStop()
//    $(".quickLink ul").removeClass('move');
//    $(this).replaceWith('<a href="javascript:void(0)" class="rgt manageQuickLink mR60">Manage</a>');
//    //$('.quickBox').stop().fadeOut();
//    lock = true;
//});
$('input.decimal').live('keyup', function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});
$('input.integer').live('keyup', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});
$('input.alpha').live('keyup', function () {
    this.value = this.value.replace(/[^a-z A-Z]/gi, '');
});
$('input.alphanum').live('keyup', function () {
    this.value = this.value.replace(/[^a-z0-9]/gi, '');
});
$('input.alphanumUndDash').live('keyup', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9 _-]/g, '');
}); $('input.prevIll').live('keyup', function () {
    this.value = this.value.replace(/[\(\)\<\>\,\;\:\\\"\[\]]/g, '');
});
$('input.integerDash').live('keyup', function () {
    this.value = this.value.replace(/[^0-9 -]/g, '');
});
$('input.integerPhone').live('keyup', function () {
    this.value = this.value.replace(/[^0-9 +-]/g, '');
});
function alignLanguage() {
    var newWidth = 0, pos = 0, lW = 0;
    $(".languageHolder ul li p").each(function () {
        liWidth = $(this).width() + 16 + 6 + 7
        newWidth = newWidth + liWidth;
    });
    lW = $(".languageHolder").width();
    last = newWidth - lW;
    pos = $('.language').offset();
    middle = pos.left + (lW / 2);
    $(".languageHolder ul").width(newWidth + 10);
    if (newWidth > lW) {
        $(".rightArrow, .leftArrow").show();
    }
};

function basicEditor() {
    $('.basicEditor').each(function (index, element) {
        //alert($('#Writeuplw').val());
        oldValue = $(this).find('textarea').val();
        basicW = $(this).find('textarea').width();
        basicH = $(this).find('textarea').height();
        oldClass = $(this).find('textarea').attr('class');
        oldID = $(this).find('textarea').attr('id');
        $(this).find('textarea').removeAttr('class').hide();
        oldGrid = $(this);
        oldHtml = $(this).html();
        $(this).html('<img src="Content/images/editor/codeView.png" alt="Code View" name="toCodeView" width="19" height="14" class="toCodeView" Title="Code View"/><div class="basicEditorC"></div><div class="text">' + oldHtml + '</div><div class="wArea">' + oldClass + '</div></div>');
        $('.basicEditorH').width(basicW).height(basicH);
        $('.basicEditorC').html(oldValue).height(basicH).attr('contenteditable', true);
        //alert(oldValue);
    });

};
function resetBasicEditor() {
    $('.basicEditor').each(function (index, element) {
        reSet = $(this).find('.wArea').text();
        $(this).find('textarea').addClass(reSet).removeAttr('style');
        newWorkArea = $(this).find('.text').html();
        $(this).html(newWorkArea);
    });
};
$('.toCodeView').live('click', function () {
    toCVal = $(this).parent().find('.basicEditorC').html();
    toTH = $(this).parents('.basicEditorH').height();
    toTW = $(this).parents('.basicEditorH').width();
    $(this).parent().find('.basicEditorC').hide();
    $(this).parent().find('textarea').val(toCVal).height(toTH).width(toTW).css({ 'resize': 'none' }).show();
    $(this).replaceWith('<img src="Content/images/editor/designView.png" alt="Design View" name="toDesignView" width="19" height="14" class="toDesignView" Title="Design View"/>');
});
$('.toDesignView').live('click', function () {
    toDValue = $(this).parent().find('textarea').val();
    $(this).parent().find('textarea').hide();
    $(this).parent().find('.basicEditorC').html(toDValue).show();
    $('.basicEditorC').attr('contenteditable', true);
    $(this).replaceWith('<img src="Content/images/editor/codeView.png" alt="Code View" name="toCodeView" width="19" height="14" class="toCodeView" Title="Code View"/>');
});
$('.basicEditorC').live('keyup', function () {
    neHt = $(this).html();
    newVal = $(this).parent().find('textarea').val();
    hidden = $(this).parent().find('textarea').attr('name');
    if (newVal == "") { $('input:hidden[name="' + hidden + '"]').val('-1'); }
    else { $('input:hidden[name="' + hidden + '"]').val(neHt); }
    $(this).parent().find('textarea').val(neHt);
});

$(".activePause .main").live('click', function () {
    currentSubT = $(this).find('img').attr('class');
    $('.activePause').removeClass('current');
    $(this).parent().addClass('current');
    $('.bCloser').hide();
    pOffset = $(this).parent().offset();
    pBottom = pOffset.top + 105;

    hH = $(this).parents('.scroll').height();
    hO = $(this).parents('.scroll').offset();
    hW = $(this).parents('.scroll').width();
    pLeft = pOffset.left + 105;
    hLeft = hO.left + hW;
    hBottom = hH + hO.top;
    $(this).parents('.activePause').find('.sub').removeClass('bottom left bottom');
    if (hBottom > pBottom) { $(this).parents('.activePause').find('.sub').addClass('top').show(); }
    if (pLeft >= hLeft) { $(this).parents('.activePause').find('.sub').addClass('left').show(); }
    if (hBottom <= pBottom) { $(this).parents('.activePause').find('.sub').addClass('bottom').show(); }
    $(this).parents('.activePause').find('.' + currentSubT).parent().addClass('current');
    return false;
});

function activePauseSelector() {
    $('.activePauseSelector').each(function (index, element) {
        newRel = $(this).attr('rel');
        if (newRel == 'deleted') {
            $(this).html('<img class="deleted" src="Content/images/bgT1px.png" width="16" height="16" alt="">');
        }
        else if (newRel == 'paused') {
            $(this).html('<div class="activePause"><div class="main "rel="paused"><img class="pause" src="Content/images/bgT1px.png" width="16" height="16" alt=""></div><div class="bCloser sub">  <div class="subT act " rel="active"><img class="active" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Active</span><div class="clr"> </div></div>  <div class="subT pau" rel="paused"><img class="pause" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Paused</span><div class="clr"> </div></div>  <div class="subT del" rel="deleted"><img  class="delete" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Deleted</span><div class="clr"> </div></div></div> </div>');
        }
        else if (newRel == 'active') {
            $(this).html('<div class="activePause"><div class="main "rel="active"><img class="active" src="Content/images/bgT1px.png" width="16" height="16" alt=""></div><div class="bCloser sub">  <div class="subT act" rel="active"><img class="active" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Active</span><div class="clr"> </div></div>  <div class="subT pau" rel="paused"><img class="pause" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Paused</span><div class="clr"> </div></div>  <div class="subT del" rel="deleted"><img  class="delete" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Deleted</span><div class="clr"> </div></div></div></div>');
        }
    });
};
function toPause(pauseThis) { $(pauseThis).parents('.activePauseSelector').html('<div class="activePause"><div class="main "rel="paused"><img class="pause" src="Content/images/bgT1px.png" width="16" height="16" alt=""></div><div class="bCloser sub">  <div class="subT act" rel="active"><img class="active" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Active</span><div class="clr"> </div></div>  <div class="subT pau" rel="paused"><img class="pause" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Paused</span><div class="clr"> </div></div>  <div class="subT del" rel="deleted"><img  class="delete" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Deleted</span><div class="clr"> </div></div></div> </div>').attr('rel', 'pause'); };
function toActive(activThis) { $(activThis).parents('.activePauseSelector').html('<div class="activePause"><div class="main "rel="active"><img class="active" src="Content/images/bgT1px.png" width="16" height="16" alt=""></div><div class="bCloser sub">  <div class="subT act" rel="active"><img class="active" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Active</span><div class="clr"> </div></div>  <div class="subT pau" rel="paused"><img class="pause" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Paused</span><div class="clr"> </div></div>  <div class="subT del" rel="deleted"><img  class="delete" src="Content/images/bgT1px.png" width="16" height="16" alt=""><span>Deleted</span><div class="clr"> </div></div></div> </div>').attr('rel', 'active'); };
function toDelete(deleteThis, deleteID, del) {
    $(deleteThis).parents('.activePauseSelector').html('<img class="deleted" src="Content/images/bgT1px.png" width="16" height="16" alt="">').attr('rel', 'delete');
if(del){$('#'+deleteID).hide();setScroll('.scroll',300);}
};

 function searchFinder() {  
    $('.searchFinder').each(function () {
     a = $(this).html();
     newW = $(this).width();
     $(this).html('<div class="lft">' + a + '</div><div class="searchHolder"><img src="Content/images/bgT1px.png" width="29" height="26" class="search" /><div class="subLevelInput"><input name="Select Your Dropdown" type="text" class="selected" value="" /> </div></div>');
     $(this).find('.selected').width(newW - 8);
     $(this).find('.lft').width(newW - 30);
   });
 };
$('.searchHolder img.search').live('click', function () {
  // $('.searchHolder .subLevelInput').hide();
   $(this).parent().find('.subLevelInput').show();
   $(this).parent().find('.selected').val('').focus().select();
    $(this).parent().find('.close').toggleClass('search , close');
   $(this).toggleClass('close , search');
   $(this).parents('.gridHead').height(70);
   $(this).parents('.gridHead').find('li').height(65);
   pID = $(this).parents('.searchFinder').index()+1;
   $(this).parent().find('.selected').attr('name', pID);
   $(this).parents('.gridCore').find('li:nth-child(' + pID + ')').not(':first').each(function () { $(this).html($(this).text().toLowerCase()); });
   //need to check 
 });
$('.searchHolder img.close').live('click', function () {
 $(this).parent().find('.selected').val('').blur();
 $(this).parent().find('.subLevelInput').hide();
   //$(this).parent().find('.subLevelInput').hide();
    $(this).parent().find('.close').toggleClass('search , close');
   $('.gridCore li').removeClass('sLI');
   if($('.searchHolder .subLevelInput').is(':visible')< 1){
    $(this).parents('.gridHead').height(30);
    $(this).parents('.gridHead').find('li').height(30);
   }
   return false;
 });
$('.searchFinder .selected').live('keyup blur',function(){
 i = $(this).parent().parent().parent().index()+1; //index
 h = $(this).parents('.gridCore'); //holder
 v = $(this).val().toLowerCase(); //value
 b = '';
 $(h).find('li:nth-child('+i+')').removeClass('s h');
 $(h).find('ul').each(function(index, element) {
  if(index>0){
  if(v!=''){b = ($(this).find('li:nth-child('+i+')').is(':contains('+v+')'));} else{ b= true;}
  if(b){$(this).find('li:nth-child('+i+')').addClass('s');}
  else{$(this).find('li:nth-child('+i+')').addClass('h');}
  d = $(this).find('li').size();
  n = $(this).find('li:not(.s):not(.h)').size();
//  s = $(this).find('li.s').size();
  x = $(this).find('li.h').size();
 $(this).show();
  if(x>0 && n<d){$(this).hide();
  }
  //setScroll('#sPdt',300);
  }
  
 });
setScroll('.scroll', 300);
});
function searchFinisher() {
   $('.searchFinder').each(function () {
     newW = $(this).width();
     $(this).find('.selected').width(newW - 8);
     $(this).find('.lft').width(newW - 30);
   });
};
function sorter(){
 $('.sorter').each(function(index, element) {
        $(this).append('<img class="sort upSort " src="Content/images/bgT1px.png" width="29" height="26" alt="">');
    });
 };
 $('.sorter .upSort').live('click',function(){
  $(this).addClass('downSort').removeClass('upSort');
 });
 $('.sorter .downSort').live('click',function(){
     $(this).addClass('upSort').removeClass('downSort');
 });
 function approvedStatus() {
     defaultMeaasge = $('.disappHolder').html();
     $('.approvedStatus').each(function (index, element) {
         appr = $(this).attr('rel');
         if (appr == 'disapproved') {
             $(this).html('<img class="disappoved" src="Content/images/disapproval.png" width="16" height="16" alt="">');
         }
         else if (appr == 'approved') {
             $(this).html('<img class="approved" src="Content/images/approval.png" width="16" height="16" alt="">');
         }
         else if (appr == 'pending') {
             $(this).html('<div class="pending"><div class="main"><img  src="Content/images/pending.png" width="16" height="16" alt=""></div><div class="sub bCloser"><div class="subT app"><img class="approved" src="Content/images/approval.png" width="16" height="16" alt=""><span>Approved</span><div class="clr"> </div></div><div class="subT dis"><img class="disappoved" src="Content/images/disapproval.png" width="16" height="16" alt=""><span>Disapproved</span><div class="clr"> </div></div></div></div>');
         }
     });
 };

 $(".approvedStatus .subT.dis").live('click', function () {
     disapprovalID = $(this).parents('ul').attr('id');
     disapproveThis = $(this);
     po = $('#' + disapprovalID).parents('.scroll').offset().top;
     pH = $('#' + disapprovalID).parents('.scroll').height();
     $('.disappHolder').html(defaultMeaasge);
     $('.disappHolder .disapp').css({ 'margin-top': (pH - 20) * -1 }).show();
     $('.approvedStatus').addClass('disabled');
     $('#' + disapprovalID).css({ 'background-color': '#999' });
 });
 $(".approvedStatus .main").live('click', function () {
     //currentSubT=$(this).find('img').attr('class');
     $('.pending').removeClass('current');
     $(this).parent().addClass('current');
     $('.bCloser').hide();
     pOffset = $(this).parent().offset();
     pBottom = pOffset.top + 105;
     hH = $(this).parents('.scroll').height();
     hO = $(this).parents('.scroll').offset();
     hBottom = hH + hO.top;
     if (hBottom > pBottom) { $(this).parents('.approvedStatus').find('.sub').removeClass('bottom').addClass('top').show(); }
     else { $(this).parents('.approvedStatus').find('.sub').removeClass('top').addClass('bottom').show(); }
     //$(this).parents('.approvedStatus').find('.'+currentSubT).parent().addClass('current');
     return false;
 });
 function toApproveThis(approveThis) {
     $(approveThis).parents('.approvedStatus').html('<img class="approved" src="Content/images/approval.png" width="16" height="16" alt="">').attr('rel', 'approved');
 };
 function toDisapproveThis(disapproveThis, disapprovalID) {
     //alert(disapprovalID);
     //$('#'+disapprovalID).hide();
     po = $('#' + disapprovalID).parents('.scroll').offset().top;
     pH = $('#' + disapprovalID).parents('.scroll').height();
     $('.disappHolder').html(defaultMeaasge);
     $('.disappHolder .disapp').css({ 'margin-top': (pH - 20) * -1 }).show();
     $('.approvedStatus').addClass('disabled');
     $('#' + disapprovalID).css({ 'background-color': '#999' });
 };



/*New FNS Added*/
 //Rebind Form Validation
 function rebindForm(formid) {
     var $form = $(formid); //validation
     $form.unbind();  // Unbind existing validation
     $form.data("validator", null);
     $form.data("unobtrusiveValidation", null);
     $.validator.unobtrusive.parse('form'); // Check document for changes
     $form.validate($form.data("unobtrusiveValidation").options); // Re add validation with changes
 }