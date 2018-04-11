function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function profileViewTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug":"section(class=tabModel.jsClass)\n    div(class='profile-inner')\n        div(class='profile-sidebar')\n            div(class='personal-photo')\n\n\n            div(class='js-personal-info personal-info')\n                p(class='js-nickname-field')\n                p(class='js-email-field')\n                \n                div(class='js-personal-statistics personal-statistics')\n                    div(class='personal-statistics-col')\n                        p\n                            |Score\n                        p(class='js-score-field')\n                    div(class='personal-statistics-col')\n                        p\n                            |Games\n                        p(class='js-games-field')\n\n\n            div(class='js-edit-btn-section')\n            div(class='js-logout-btn-section')\n\n        div(class='js-profile-center profile-center')"};
;var locals_for_with = (locals || {});(function (tabModel) {;pug_debug_line = 1;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Csection" + (pug_attr("class", pug_classes([tabModel.jsClass], [true]), false, false)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-inner\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-sidebar\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"personal-photo\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"js-personal-info personal-info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cp class=\"js-nickname-field\"\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 9;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cp class=\"js-email-field\"\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"js-personal-statistics personal-statistics\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"personal-statistics-col\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 14;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "Score\u003C\u002Fp\u003E";
;pug_debug_line = 15;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cp class=\"js-score-field\"\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"personal-statistics-col\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 18;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "Games\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cp class=\"js-games-field\"\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"js-edit-btn-section\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 23;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"js-logout-btn-section\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "public\u002Fjs\u002Fmodules\u002FinitialScreen\u002FdownScreen\u002FprofileView\u002Fprofile.view.pug";
pug_html = pug_html + "\u003Cdiv class=\"js-profile-center profile-center\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";}.call(this,"tabModel" in locals_for_with?locals_for_with.tabModel:typeof tabModel!=="undefined"?tabModel:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}