/* ==========================================================================
   Styling and layout for all media
   ========================================================================== */


/* Abridged version of Normalize.css
   ========================================================================== */
/* original authors: Nicolas Gallagher and Jonathan Neal - http://necolas.github.com/normalize.css/ */

/* corrects block display not defined in IE7-9, Firefox3 */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
nav,
section,
summary {
  display: block;
}

/* corrects inline-block display not defined in IE7-9, Firefox3 */
audio,
canvas,
video {
  display: inline-block;
  /* display and zoom IE7 fix for display:inline-block */
  *display: inline;
  *zoom: 1;
}

/* prevents modern browsers from displaying 'audio' without controls, remove excess height in iOS5 devices */
audio:not([controls]) {
  display: none;
  height: 0;
}

/* addresses styling for 'hidden' attribute not present in IE7-9, Firefox3, Safari4 */
[hidden] {
  display: none;
}

html {
  /* corrects text resizing oddly in IE7 when body font-size is set using em units -
     http://clagnut.com/blog/348/#c790 */
  font-size: 100%;
  /* always force scrollbar padding so we don't get 'jumping' */
  overflow-y: scroll;
  /* prevents iOS text size adjust after orientation change, without disabling user zoom -
     http://www.456bereastreet.com/archive/201012/controlling_text_size_in_safari_for_ios_without_disabling_user_zoom/ */
  -webkit-text-size-adjust: 100%;
  /* as above, for Windows Phone */
  -ms-text-size-adjust: 100%;
}

/* Addresses margins set differently in IE7 */
p,
pre {
  margin: 1em 0;
}

/* addresses style set to 'bolder' in Firefox3-4, Safari4-5, Chrome */
b,
strong {
  font-weight: bold;
}

/* addresses CSS quotes not supported in IE7, addresses quote property not supported in Safari4 */
q {
  quotes: none;
}

q:before,
q:after {
  content: "";
  content: none;
}

/* prevents sub and sup affecting line-height in all browsers */
sub,
sup {
  /* 12px */
  font-size: .85714285714286em;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sup {
  top: -0.5em;
}

sub {
  bottom: -0.25em;
}

/* removes border when inside 'a' element in IE7-9, Firefox3, improves image quality when scaled in IE7 -
   code.flickr.com/blog/2008/11/12/on-ui-quality-the-little-things-client-side-image-resizing/ */
img {
  border: 0;
  -ms-interpolation-mode: bicubic;
}

/* consistent tables */
table {
  margin-bottom: 1em;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

/* make table cells align top and left by default */
th,
td {
  vertical-align: top;
  text-align: left;
}

/* addresses margins set differently in IE7 */
dl,
menu,
ol,
ul {
  margin: 1em 0;
}
dd {
  margin: 0 0 0 2em;
}

/* remove margins from nested lists */
dl dl,
ul ul,
ol ol {
  margin: 0;
}

/* addresses paddings set differently in IE7 */
menu,
ol,
ul {
  padding: 0 0 0 2em;
}


/* Clearfix
   ========================================================================== */
/* updated to prevent margin-collapsing on child elements in most situations -
   http://nicolasgallagher.com/micro-clearfix-hack/ */

.clearfix,
header,
nav ul,
.container,
footer,
#paginator,
#monthly-list {
  /* zoom IE7 fix */
  *zoom: 1;
}

.clearfix:before,
.clearfix:after,
header:before,
header:after,
nav ul:before,
nav ul:after,
.container:before,
.container:after,
footer:before,
footer:after,
#paginator:before,
#paginator:after,
#monthly-list:before,
#monthly-list:after {
  content: "";
  display: table;
}

.clearfix:after,
header:after,
nav ul:after,
.container:after,
footer:after,
#paginator:after,
#monthly-list:after {
  clear: both;
}

/* ==========================================================================
   Styling and layout for screen media (mobile first)
   ========================================================================== */


@media screen {


/* Layout
   ========================================================================== */

body {
  margin: 0;
  background: #ffffff;
}

.wrapper {
  border-bottom: solid 1px #ccc;
  padding-top: 1em;
  background: #ffffff;
}

header,
.container,
footer {
  margin: 0 auto;
  /* 960px / 1024px */
  width: 93.75%;
  max-width: 960px;
}

header {
	padding: 0;
min-height:150px;
margin-top: 6px;
background:url(//saintstephens.ca/images/28.jpg) right bottom no-repeat;
}
#site-title { float:right; text-align:right;  }
header h1 {
margin-top: 0px;
	font-size: 2.1em;
	line-height:1.2;
	font-weight: bold;
color:#ffffff!important;
	display: inline;
	float: right;
padding-right:10px;
}
header h1 a:link, #site-title h1 a:active, #site-title h1 a:visited { color: #ffffff!important; }
#site-title p a:link,  #site-title p a:active, #site-title p a:visited { color: #ddddff!important; }
header h1 a:hover {
	text-decoration:none;
color:#ffffff;
}

header h3 {
  /* 14px margin top */
  margin: .66666666666667em 0 0;
}

nav {
width:93.75%; max-width: 960px; margin: 0 auto;
background-color: transparent;
color: #6666ff!important;
}

nav h1 {
  display: none;
}

nav ul {
  margin: 0 auto;
  padding: 0;
  max-width: 86em;
  list-style: none;
  list-style-image: none;
}

nav li {
  margin: 0;
background-color: #dff;
border-bottom: solid 1px #e1a61a;
}

nav li:last-child {
  border-bottom: 0;
}

nav li:hover,
nav li.active {
  background-color: #dff;

}

nav li:active {
  background-color: #dff;

}

nav a {
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
color: #6666ff!important;
  display: block;
  padding: .5em 3.125%;
}

[role="article"] {
  margin-bottom: 2em;
}

[role="complementary"] {
  margin-bottom: 2em;
  padding-top: 2em;
  border-top: dashed 2px #ccc;
}

[role="search"] p {
  margin-top: 0;
}

footer {
text-align: center;
  padding: .5em 0;
}

/* image alignments */
img.align-left, img.alignleft, span.img-caption-left {
  float: left;
  margin: 1em 1em 0 0;
}
img.align-right, img.alignright, span.img-caption-right {
  float: right;
  margin: 1em 0 0 1em;
}
img.align-center {
  display: block;
  margin: 1em auto;
}

/* Links
   ========================================================================== */

a {
  position: relative;
  text-decoration: none;
color: #009BC2;
  -webkit-tap-highlight-color: rgba(0, 102, 255, 0.5);
}

a:hover, a:active {
  /* improves readability when focused and also mouse hovered in all browsers */
  outline: 0;
}

a:active {
  top: 1px;
}

a:focus {
  outline: thin dotted #06f;
}

header a {
  color: #333;
  -moz-border-radius: .11904761904762em;
  border-radius: .11904761904762em;
}

header a:hover, header a:active {
  background: #9a9a9a;
}
[role="main"] p a, 
[role="main"] li a,
[role="main"] blockquote a
 { font-weight:bold; }
[role="main"] a:hover,
[role="main"] a:active,
[role="complementary"] a:hover,
[role="complementary"] a:active,
footer a:hover,
footer a:active {
  text-decoration: underline;
  color: #06f;
}

[role="main"] a:visited,
[role="complementary"] a:visited,
footer a:visited {
  color: #183082;
}

[role="main"] h1 a {
color: #009BC2;
  -moz-border-radius: .11904761904762em;
  border-radius: .11904761904762em;
}

[role="main"] h1 a:visited {
color: #009BC2;
}

[role="main"] h1 a:hover,
[role="main"] h1 a:active {
  text-decoration: none;
  color: #333;
  background: #efefef;
}
div.sticky { background-color: transparent; }

/* Typography
   ========================================================================== */

body {
  font-family: 'Droid Sans', Tahoma, sans-serif;
  /* 14px / 16px */
  font-size: 0.975em;
  line-height: 1.6;
  color: #222;
}
i,
em,
cite {
font-family: 'Droid Serif', Georgia, serif; font-style: italic; font-size: 105%;
}
nav {
  font-family: 'Droid Sans', Tahoma, sans-serif;
  font-weight: bold;
}

h1 {
  font-family: 'Droid Sans', Tahoma, sans-serif;
  /* 28px */
  font-size: 2em;
font-weight: bold;
  /* 34px / 28px */
  line-height: 1.21428571428571;
  letter-spacing: 1px;
  /* 28px margin top/bottom */
  margin: .66666666666667em 0;
}

h1:first-child {
  margin-top: 0;
}

h2 {
  font-family: 'Droid Sans', Tahoma, sans-serif;
  /* 21px */
  font-size: 1.5em;
  /* 28px / 21px */
  line-height: 1.33333333333333;
  /* 21px margin top/bottom */
  margin: .75em 0;
}

h3 {
  /* 18px */
  font-size: 1.28571428571429em;
  /* 26px / 18px */
  line-height: 1.44444444444444;
  font-weight: normal;
  /* 16px margin top/bottom */
  margin: .76190476190476em 0;
}

h4 {
  font-family: 'Droid Sans', Tahoma, sans-serif;
  /* 16px */
  font-size: 1.14285714285714em;
  margin: 0;
}

blockquote {
  /* 16px */
  font-size: 1.14285714285714em;
  font-style: italic;
  margin: .875em 0 .875em 0;
  padding: 1px .875em;
  -moz-border-radius: .35714285714286em;
  border-radius: .35714285714286em;
  background: #fff6d3;
}

address {
  margin: 1em 0;
}

/* addresses styling not present in IE7-9, Safari5, Chrome */
abbr[title],
dfn[title] {
  border-bottom: dotted 1px;
  cursor: help;
}

dfn,
mark,
q,
var {
  padding: 0 .21428571428571em;
  -moz-border-radius: .21428571428571em;
  border-radius: .21428571428571em;
  color: #333;
  background: #fff6d3;
}

dfn,
q {
  font-style: italic;
}

q q {
  padding: 0;
}

var, span.title {
  font-weight: bold;
}

pre,
code,
kbd,
samp {
  font-family: Cousine, Consolas, "Lucida Console", Monaco, monospace;
}

code,
kbd,
samp {
  /* 13px */
  font-size: .92857142857143em;
  border: 1px solid #e3e3e3;
  padding: 0 .23076923076923em;
  -moz-border-radius: .23076923076923em;
  border-radius: .23076923076923em;
  background: #f7f7f7;
}

pre {
  /* 13px */
  font-size: .92857142857143em;
  overflow-x: auto;
  border: 1px solid #e3e3e3;
  padding: 1em;
  -moz-border-radius: .35714285714286em;
  border-radius: .35714285714286em;
  background: #f7f7f7;
  tab-size: 4;
}

pre code {
  /* 13px */
  font-size: 1em;
  border: 0;
  background: none;
}

small,
figcaption, .caption,
tfoot,
.footnote {
  /* 12px */
  font-size: .85714285714286em;
}
figcaption, .caption,
tfoot,
.footnote {
  color: #888;
}

figcaption, .caption {
  margin-top: .083em;
  font-style: italic;
font-family: 'Droid Serif';
}
hr.fancy {width:60%; border:0; height: 1px; background: #333; 
background-image: -webkit-linear-gradient(left, #fcc, #33f, #cfc); 
background-image: -moz-linear-gradient(left, #fcc, #33f, #cfc); 
background-image: -ms-linear-gradient(left, #fcc, #33f, #cfc); 
background-image: -0-linear-gradient(left, #fcc, #33f, #cfc);
}

/* Embedded content
   ========================================================================== */

img,
video {
  max-width: 100%;
  height: auto;
}

figure {
  margin: 0;
}



/* corrects overflow displayed oddly in IE9 */
  svg:not(:root) {
  overflow: hidden;
}


/* Tables
   ========================================================================== */

caption {
  font-style: italic;
  text-align: left;
  margin-bottom: .5em;
}

th,
td {
  border-bottom: solid 1px #ccc;
  padding: .28571428571429em .5em .28571428571429em 0;
}

th:last-child,
td:last-child {
  padding-right: 0;
}

thead th,
thead td {
  border-bottom: solid 2px #ccc;
}

tfoot th,
tfoot td {
  border-bottom: 0;
  padding: .33333333333333em .58333333333333em .33333333333333em 0;
}

tfoot:last-child {
  padding-right: 0;
}


/* Lists
   ========================================================================== */

dt {
  font-weight: bold;
font-size: 1.0em;
}

[role="main"] #article-list {
  list-style: none;
  margin: 0 0 2em 0;
  padding: 0;
  border-top: solid 1px #ccc;
}

#article-list li {
  border-bottom: solid 1px #ccc;
  padding-top: 1em;
  margin-bottom: 0;

}


/* Forms
   ========================================================================== */

/* corrects margin displayed oddly in IE6-7 */
form {
  margin: 0;
}

/* remove default fieldset styling across browsers */
fieldset {
  margin: 0;
  border: 0;
  padding: 0;
}

/* corrects text not wrapping in FF3, corrects alignment displayed oddly in IE7 */
legend {
  border: 0;
  padding: 0;
  white-space: normal;
  *margin-left: -7px;
}

/* improves appearance and consistency in all browsers */
button,
input,
select,
textarea {
  font-size: 100%;
  margin: 0;
  vertical-align: baseline;
  /* improves appearance and consistency in IE7 */
  *vertical-align: middle;
}

/* colour placeholder text (Webkit and Mozilla only, so far) */
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #888;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #888;
}

/* suppress red glow that Firefox adds to form fields by default, even when user is still typing
   add focus glow on form elements and kill phantom spacing and dotted border that appears in Firefox */
button:invalid,
a.button:invalid,
input:invalid,
input[type="button"]:invalid,
input[type="reset"]:invalid,
input[type="submit"]:invalid,
textarea:invalid {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
button::-moz-focus-inner,
a.button::-moz-focus-inner,
input::-moz-focus-inner,
input[type="button"]::-moz-focus-inner,
input[type="reset"]::-moz-focus-inner,
input[type="submit"]::-moz-focus-inner,
textarea::-moz-focus-inner {
  border: 0;
  padding: 0;
}
button:focus,
a.button:focus,
input:focus,
input[type="button"]:focus,
input[type="reset"]:focus,
input[type="submit"]:focus,
select:focus,
textarea:focus {
  -webkit-box-shadow: 0 0 7px #0066ff;
  -moz-box-shadow: 0 0 7px #0066ff;
  box-shadow: 0 0 7px #0066ff;
  /* Opera */
  z-index: 1;
}

  /* remove inner padding and search cancel button in webkit on OS X */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}

input[type="file"]:focus,
input[type="file"]:active,
input[type="radio"]:focus,
input[type="radio"]:active,
input[type="checkbox"]:focus,
input[type="checkbox"]:active {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

textarea,
input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"] {
  /* remove iOS Safari default styling */
  -webkit-appearance: none;
  font-family: 'Droid Sans', Tahoma, sans-serif;
  /* 12px */
  font-size: .85714285714286em;
  text-align: left;
  border: solid 1px #ccc;
  padding: .5em;
  background: #fff;
  outline: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -moz-border-radius: 0;
  border-radius: 0;
}

input[type="color"] {
  padding: 0;
  height: 2.33333333333333em;
}

[role="complementary"] input[type="search"] {
  margin-right: 2px;
  width: 66.666666666667%;
  display: inline-block;
  /* display and zoom IE7 fix for display:inline-block */
  *display: inline;
  *zoom: 1;
}

textarea {
  min-height: 3em;
  /* removes default vertical scrollbar in IE7-9 */
  overflow: auto;
  /* improves readability and alignment in all browsers */
  vertical-align: top;
  resize: vertical;
  width: 100%;
}

select {
  font-family: 'Droid Sans', Tahoma, sans-serif;
  /* 12px */
  font-size: .85714285714286em;
  text-align: left;
  border: solid 1px #ccc;
  padding: .5em;
  background: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

textarea,
select[size],
select[multiple] {
  height: auto;
}

optgroup {
  font-family: 'Droid Sans', Tahoma, sans-serif;
  font-style: normal;
  font-weight: normal;
  color: #333;
}

/* kill phantom spacing and dotted border that appears in Firefox */
optgroup::-moz-focus-inner {
  border: 0;
  padding: 0;
}

/* addresses box sizing set to content-box and excess padding in IE7-9 */
input[type="checkbox"],
input[type="radio"] {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  *height: 1em;
  *width: 1em;
}

/* make sure disable elements really are disabled */
button[disabled],
input[disabled],
input[type="button"][disabled],
input[type="reset"][disabled],
input[type="submit"][disabled],
select[disabled],
select[disabled] option,
select[disabled] optgroup,
textarea[disabled],
span.disabled {
  opacity: 1;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: -moz-none;
  user-select: none;
  border: solid 1px #d2d2d2 !important;
  text-shadow: none !important;
  color: #888888 !important;
  background: #eee !important;
  cursor: default !important;
  top: 0 !important;
}

.large input {
  width: 50%;
  min-width: 302px;
}

.large textarea {
  height: 156px;
}

.small input {
  width: 25%;
  min-width: 151px;
}

.small textarea {
  height: 5.5em;
}


/* Buttons
   ========================================================================== */

button,
[role] a.button,
span.disabled,
input[type="button"],
input[type="reset"],
input[type="submit"] {
  /* remove iOS Safari default styling */
  -webkit-appearance: none;
  -webkit-background-clip: padding;
  -khtml-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
  width: auto;
  overflow: visible;
  font-family: 'Droid Sans', Tahoma, sans-serif;
  /* 12px */
  font-size: .85714285714286em;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  text-decoration: none;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border: solid 1px #e1a61a;
  -moz-border-radius: .35714285714286em;
  border-radius: .35714285714286em;
  padding: .5em 1em;
  display: inline-block;
  /* display and zoom IE7 fix for display:inline-block */
  *display: inline;
  *zoom: 1;
  color: #333;
  outline: 0;
  background-color: #ffda44;
  /* Konqueror */
  background-image: -khtml-gradient(linear, left top, left bottom, from(#ffda44), to(#fabc2b));
  /* Safari4+, Chrome */
  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffda44), to(#fabc2b));
  /* Safari5.1+, Chrome10+ */
  background-image: -webkit-linear-gradient(#ffda44, #fabc2b);
  /* Firefox3.6 */
  background-image: -moz-linear-gradient(#ffda44, #fabc2b);
  /* Opera11.10+ */
  background-image: -o-linear-gradient(#ffda44, #fabc2b);
  /* CSS3 Compliant */
  background-image: linear-gradient(#ffda44, #fabc2b);
}

button:hover,
[role] a.button:hover,
input[type="button"]:hover,
input[type="reset"]:hover,
input[type="submit"]:hover {
  background-color: #ffe477;
  /* Konqueror */
  background-image: -khtml-gradient(linear, left top, left bottom, from(#ffe477), to(#fbcc5d));
  /* Safari4+, Chrome */
  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffe477), to(#fbcc5d));
  /* Safari5.1+, Chrome10+ */
  background-image: -webkit-linear-gradient(#ffe477, #fbcc5d);
  /* Firefox3.6 */
  background-image: -moz-linear-gradient(#ffe477, #fbcc5d);
  /* Opera11.10+ */
  background-image: -o-linear-gradient(#ffe477, #fbcc5d);
  /* CSS3 Compliant */
  background-image: linear-gradient(#ffe477, #fbcc5d);
}

button:active,
[role] a.button:active,
input[type="button"]:active,
input[type="reset"]:active,
input[type="submit"]:active {
  position: relative;
  top: 1px;
  color: #1a1a1a;
  background-color: #fabc2b;
  /* Konqueror */
  background-image: -khtml-gradient(linear, left top, left bottom, from(#fabc2b), to(#ffda44));
  /* Safari4+, Chrome */
  background-image: -webkit-gradient(linear, left top, left bottom, from(#fabc2b), to(#ffda44));
  /* Safari5.1+, Chrome10+ */
  background-image: -webkit-linear-gradient(#fabc2b, #ffda44);
  /* Firefox3.6 */
  background-image: -moz-linear-gradient(#fabc2b, #ffda44);
  /* Opera11.10+ */
  background-image: -o-linear-gradient(#fabc2b, #ffda44);
  /* CSS3 Compliant */
  background-image: linear-gradient(#fabc2b, #ffda44);
}

#paginator {
  margin-bottom: 2em;
}

#paginator .button {
  padding: .25em 1em;
}

#paginator a.button {
  text-decoration: none;
  color: #333;
}

#paginator-l {
  float: left;
}

#paginator-r {
  float: right;
}


/* Comments
   ========================================================================== */

.comments {
  margin-bottom: 1em;
  -moz-border-radius: .35714285714286em;
  border-radius: .35714285714286em;
  padding: 1em 1em 1px;
  background: #f7f7f7;
  word-wrap: break-word;
}

.comments h4 .is-author {
  font-weight: normal;
}

.comments h4 .comment-anchor {
  float: right;
  font-weight: normal;
 }

.comments-author {
  background: #efefef;
}

#cpreview {
  margin-bottom: 2px;
  -moz-border-radius: .35714285714286em;
  border-radius: .35714285714286em;
  padding: 1em;
  background: #fff3d6;
}

.comments_error {
  background: #fff4f4 !important;
}

.required,
.error_message li {
  color: #c00;
}

.required {
	cursor: help;
}


/* Popup comments (can be removed if you don't use popups)
   ========================================================================== */

#popup-page .wrapper {
  padding-top: 0;
}

#popup-page .container {
  max-width: 52em;
}

}


/* addresses select alignment in Safari/Chrome */
@media screen and (-webkit-min-device-pixel-ratio: 0) {

select,
select[size="0"],
select[size="1"] {
  height: 2.2em;
}

select:not([size]),
select:not([multiple]) {
  position: relative;
  top: -1px;
}

}
/* ==========================================================================
   Toggle menu in small devices
   ========================================================================== */

@media screen and (max-width: 47.5em) {
  nav ul     { display: none; }
  nav select { display: inline-block; max-width:75%; }
#calendarbg {overflow: scroll; }
}


/* ---------------- liturgical ------------ */
div#services, div#banner {
  float: left;
  border: 1px solid #e3e3e3;
  -moz-border-radius: .35714285714286em;
  border-radius: .35714285714286em;
  padding: 4px;
width: 100%; 
background-color:#ddffff; 
height:auto;
margin-right: 6px; 
font-size:0.9em; 
}
div#services {margin-right:16px; }
div.200px_spacer { visibility: invisible; display: none; }
div#services a { font-weight: normal; text-decoration:underline; }
div#services p {margin-top: 0px; margin-bottom: 0px; }
div#liturgy { margin-top:6px; padding:0; }
div.White { background-color:#ffffff!important; color:#000; }
div.Red { background-color:#ff0000!important; color:#fff!important;   }
div.Blue { background-color:#0000ff!important; color:#fff!important;  }
div.Violet { background-color:#734f96!important; color:#fff!important; }
div.Green { background-color:#228B22!important; color:#fff!important;  }
div.Rose { background-color:#ff9999!important; color:#000;   }
hgroup.Green, #Green {background-color: #228B22!important; height:auto;}
hgroup.Red, #Red {background-color: #ff3333!important; height:auto;}
hgroup.White, #White {background-color: #ffee99!important; height:auto;}
hgroup.Violet, #Violet {background-color: #734f96!important; height:auto;}
hgroup.Blue, #Blue {background-color: #6666ff!important; height:auto;}
hgroup.Rose, #Rose { background-color:#ff9999!important; color:#000;   }
.cal {width:80px; margin-right:3px; margin-bottom:3px;  height:140px; font-size:0.8em; font-family: Helvetica, Arial, sans-serif; color:#fff; float:left; }
.LGreen { border-top:6px solid #228b22; }
.LRed { border-top:6px solid #ff3333; }
.LWhite  { border-top:6px solid #ffffff; }
.LViolet  { border-top:6px solid #734f96; }
.LBlue   { border-top:6px solid #6666ff; }
.LRose   { border-top:6px solid #ffff99; }
#calendarbg {background-color: #000; width:610px; min-height:640px; padding-left:6px; overflow:auto; }
.calendarhead { width:82px; margin-right:5px; margin-bottom:3px; color:#fff; height:auto; font-size:0.8em; font-weight:bold; font-family:Helvetica, Arial, sans-serif; float:left; }
.coming-events, .services, #services, .textwidget p { font-size: 0.9em; line-height: 1.2em;  }
.coming-events p, .textwidget p { margin-top:0px; margin-bottom: 3px; }
.coming-events { margin-bottom:3px; }
p.quote { font-family: 'Droid Serif', Georgia, Palatino, serif; font-style: italic; font-size: 1.05em; border-left: 2px solid cyan; margin-top:0; margin-bottom:0; padding-left: 6px; padding-bottom: 6px; padding-top: 6px; }

/* ==========================================================================
   Additional layout for screen media 490px and up
   ========================================================================== */
@media only screen and (min-width: 35em) {
div#services {
  width: 140px; }
}


/* ==========================================================================
   Additional layout for screen media 672px and up
   ========================================================================== */


@media only screen and (min-width: 48em) {
nav select { display: none ; }
<!-- this is the new JS driven collapsible style -->

<!-- this is the non-JS style -->
nav ul 
{   font-size: 1em;  margin: 0;   padding: 0;   list-style: none; }
 nav ul li 
{   display: block;   position: relative;   float: left;  background-color: #ffffff; }
 nav li ul 
{ display: none; }
 nav ul li a 
{   display: block;   text-decoration: none;   color: #ff0000;   padding: 5px 15px 5px 15px;  margin-left: 1px;   white-space: nowrap; }
 nav ul li a:hover 
{ background-color: #ffffff; }
 nav li:hover ul 
{   display: block; width:auto;  position: absolute; z-index:100; }
 nav li:hover li 
{   float: none;  font-size: 0.9em;  }
 nav li:hover a 
{ background-color: #ffffff; }
 nav li:hover li a:hover 
{ background-color: #ffffff; 
}
nav li:last-child {
border-bottom: solid 1px #e1a61a;
} 

[role="main"] {
  float: left;
  /* 592px / 960px */
width:72%; max-width: 62em;
}

[role="complementary"] {
  float: right;
  border: 1px solid #e3e3e3;
  -moz-border-radius: .35714285714286em;
  border-radius: .35714285714286em;
  padding: 0.5em 0.5em 0;
  /* 290px / 960px */
width: 23%; max-width: 20em;
  background: #ddffff;
}
h1 {
  /* 42px */
  font-size: 1.4em;
font-weight: bold;
}

h2 {
  /* 28px */
  font-size: 1.3em;
font-weight: bold;
}

h3 {
  /* 21px */
  font-size: 1.2em;
font-weight: bold;
}
h3.blog, h3.widget-title { 
font-size: 1.1em; font-weight: normal; margin-bottom:4px; 
}
blockquote {
  float: right;
  margin: 0 0 .875em .875em;
  /* 254px / 592px */
  width: 42.905405405405%;
}
.newspaper
{
font-size: 90%;
-moz-column-count: 3;
-moz-column-gap: 1em;
-moz-column-rule: 1px solid #ccc;
-webkit-column-count: 3;
-webkit-column-gap: 1em;
-webkit-column-rule: 1px solid #ccc;
}
div.right-float {
width : 180px;
float : right;
margin-left : 10px;
margin-top : 0;
}
}
/* ==========================================================================
   Additional layout for screen media 760px and up
   ========================================================================== */


@media only screen and (min-width: 48em) and (max-width:55em; {
[role="complementary"] {
width: 180px;
}
div.200px_spacer { display: block; visibility: visible; height:200px; }
}

/* ==========================================================================
   Additional layout for screen media 900px and up
   ========================================================================== */


@media only screen and (min-width: 56em) {
[role="complementary"] {
width: 200px;
}
div.outer {
max-width: 960px; margin: 0 auto; 
}
}

/* ==========================================================================
   Additional layout for screen media 1280px and up
   ========================================================================== */


@media only screen and (min-width: 80em) {

body {
  /* 16px */
  font-size: 100%;
}

header,
nav ul,
.container,
footer {
  /* 1152px / 1280px */
  width: 960px;
}
header {
min-height:240px; 
}
}


/* ==========================================================================
   Additional layout for screen media 1800px and up
   ========================================================================== */


@media only screen and (min-width: 112.5em) {

body {
  /* 18px */
  font-size: 112.5%;
}

}



/* ==========================================================================
   Fix for reponsive embedded content in IE8
   ========================================================================== */


@media \0screen {

img,
video {
  width: auto;
}

}



/* ==========================================================================
   Styling and layout for print media
   ========================================================================== */


@media print {

* {
  /* black prints faster - http://sanbeiji.com/archives/953 */
  color: black !important;
  text-shadow: none !important;
  background: transparent !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
}

body {
  font-family: Verdana, Tahoma, sans-serif;
  font-size: 10pt;
  line-height: 1.5;
  margin: .5cm;
  padding: 2em 5em;
}

header {
  border-bottom: solid 1pt black;
}

header, footer, #liturgy {
visibility: hidden; display: none;
}

/* hide unnecessary content from print */
nav,
audio,
video,
form,
[role="complementary"],
#paginator,
#comments-form,
.comments h4 a:last-child {
  display: none;
}

a {
  text-decoration: none;
}

/* show URLs for certain links in print */
a[href]:after {
  content: " (" attr(href) ")";
}

h1 a[href]:after,
h2 a[href]:after,
h3 a[href]:after,
sup a[href]:after,
a[itemprop="discussionUrl"]:after,
a[rel="tag"]:after {
  content: "";
}

/* show long-form for abbreviations in print */
abbr[title]:after {
  content: " (" attr(title) ")";
}

h1 {
  font-size: 14pt;
  line-height: 16pt;
  font-weight: normal;
  margin: .5em 0;
}

h2 {
  font-size: 12pt;
  line-height: 14pt;
  page-break-after: avoid;
  orphans: 3;
  widows: 3;
  margin: .66666666666667em 0;
}

h3 {
  font-size: 12pt;
  line-height: 14pt;
  page-break-after: avoid;
  orphans: 3;
  widows: 3;
  margin: .66666666666667em 0;
}

p {
  orphans: 3;
  widows: 3;
}

footer,
figcaption,
tfoot,
small,
.footnote {
  font-size: 7pt;
}

blockquote {
  border: solid 1pt black;
  padding: 0 8pt;
  page-break-inside: avoid;
}

pre {
  margin-bottom: 8pt;
  border: solid 1pt black;
  padding: 8pt;
}

.comments {
  page-break-inside: avoid;
}

pre,
code,
kbd,
samp,
var {
  font-family: "Courier New", Courier, monospace;
}

dfn,
q {
  font-style: italic;
}

img {
  max-width: 100% !important;
  page-break-inside: avoid;
}

/* image alignemnts */
img.align-left, img.alignleft, span.img-caption-left {
  float: left;
  margin: 1em 1em 0 0;
}
img.align-right, img.alignright, span.img-caption-right {
  float: right;
  margin: 1em 0 0 1em;
}
img.align-center {
  display: block;
  margin: 1em auto;
}

audio {
  display: none;
}

figure {
  margin-bottom: 8pt;
}

figcaption {
  margin-top: 4pt;
}

ul {
  list-style: square;
  margin: 0 0 8pt 1.8em;
}

ol {
  list-style: decimal;
  margin: 0 0 8pt 1.8em;
}

dl {
  margin: 0 0 8pt 1.8em;
}

table {
  margin-bottom: 8pt;
  width: 100%;
}

caption {
  font-weight: bold;
  text-align: left;
  margin-bottom: 4pt;
}

/* display table head across multi-page tables - http://css-discuss.incutio.com/wiki/Printing_Tables */
thead {
  display: table-header-group;
}

thead th {
  border-top: solid 1pt black;
}

tr {
  page-break-inside: avoid;
}

th,
td {
  border-bottom: solid 1pt black;
  padding: 4pt 8pt;
}

}
