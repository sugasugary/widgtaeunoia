var sourceCodeTextareaObj = "";
var sourceCodeFormattedTextareaObj = "";
var sourceCodeOutputDivObj = "";
var tabSize = "5";
var language="";
var lineNumbering = true;
var removeBlankLines = true;
var embededStylesheet = true;
var tag=true;
var blockWidth="100%";
var blockHeight="auto";
var alternativeBackground = true;

function CICodeFormatter(sourceCodeTextareaObj,sourceCodeFormattedTextareaObj,sourceCodeOutputDivObj){
	this.sourceCodeTextareaObj = document.getElementById(sourceCodeTextareaObj); 
	this.sourceCodeFormattedTextareaObj = document.getElementById(sourceCodeFormattedTextareaObj);
	this.sourceCodeOutputDivObj=document.getElementById(sourceCodeOutputDivObj);
}

CICodeFormatter.prototype.formatSourceCode=function(lang,tag,tabSize,lineNumbering,removeBlankLines,embededStylesheet,blockWidth,blockHeight,alternativeBackground){
	this.language = lang;
	this.tag = tag;
	this.tabSize =  tabSize;
	this.lineNumbering = lineNumbering;
	this.removeBlankLines = removeBlankLines;
	this.embededStylesheet = embededStylesheet;
	this.blockWidth = blockWidth;
	this.blockHeight = blockHeight;
	this.alternativeBackground = alternativeBackground;
	switch(language){
		case "PHP":
			break;
		default:
			this.formatAnyCode();
			break;
	}
	
}

CICodeFormatter.prototype.getSourceCode = function(){
	var sc = this.sourceCodeTextareaObj.value;
	sc = this.escapeEntities(sc);
	return sc;
}

CICodeFormatter.prototype.escapeEntities = function(str){
	var sc = str;
	var space = "";
	for(var i=0;i<this.tabSize;i++){
		if(this.tag=="true")
			space+="&nbsp;";
		else 
			space+=" ";
	}
	sc = sc.replace(/  /g," ");
	sc = sc.replace(/&/g,"&amp;");
	sc = sc.replace(/</g,"&lt;");
	sc = sc.replace(/>/g,"&gt;");
	sc = sc.replace(/\t/g,space);
	return sc;
	
}

CICodeFormatter.prototype.trim=function(str){
	return str.replace(/^\s+|\s+$/g,"");
}

CICodeFormatter.prototype.rightTrim=function(str){
	return str.replace(/^\s+$/,"");
}

CICodeFormatter.prototype.formatAnyCode = function(){
	var sourceCode = this.getSourceCode();
	var fc="";
	var counter=0;
	var lines = sourceCode.split('\n');
	var bg = "#f0f0f0";
	var mxChars = "0";
	var lineNumber = "";
	var tmp="";
	var lineStyle = "";
	var codeStyle = "";
	var parentStyle = "";
	var styleSheet  = "";
	for(var i=0;i<lines.length;i++){
		bg = (counter % 2 == 0 )?"#f0f0f0":"#ffffff";
		tmp = (this.removeBlankLines=="true")?lines[i].replace(/&nbsp;/g,"").replace(/ /g,""):lines[i];
		if(this.trim(tmp)!="" || this.removeBlankLines=="false"){
			counter++;
			if(this.embededStylesheet == "true"){
				lineStyle = 'style="width:30px;color:gray;"';
				//codeStyle = 'style="white-space : nowrap;width:auto;background:'+bg+';"';
			}
			if(this.lineNumbering == "true") lineNumber='<span '+lineStyle+'>'+(counter)+' :&nbsp;&nbsp;</span>';
			if(this.tag=="true"){
				fc+= '<div class="CICodeLine'+(counter % 2)+'" '+codeStyle+'>'+lineNumber+''+lines[i]+"</div>";
			}else{
				if(this.lineNumbering == "true"){ 
					var space ="";
					fc+=(counter)+':  '+lines[i]+'  \n';
				}else{
					fc+=" "+lines[i]+"  \n";
				}

			}
		}
	}
	//genratting formatted source code..
	if(this.embededStylesheet == "true"){
		//parentStyle='style="font-family:arial;font-size:12px;border:1px dashed #CCCCCC;width:'+this.blockWidth+';height:'+this.blockHeight+';overflow:auto;background:#f0f0f0;"';
		parentStyle='style="font-family:arial;font-size:12px;border:1px dashed #CCCCCC;width:'+this.blockWidth+';height:'+this.blockHeight+';overflow:auto;background:#f0f0f0;'+((this.tag=="false" && this.alternativeBackground=="true")?";background-image:URL(http://2.bp.blogspot.com/_z5ltvMQPaa8/SjJXr_U2YBI/AAAAAAAAAAM/46OqEP32CJ8/s320/codebg.gif);":"")+'padding:0px;color:#000000;text-align:left;line-height:20px;"';
		
	}else{
		styleSheet = this.getStyleSheet();					
	}
	
	if(this.tag=="true"){
		fc = '<b style="font-family:verdana;font-size:10px;">CODE:</b><br><div style="white-space : nowrap;"><div class="CICodeFormatter" '+parentStyle+'>'+fc+'</div></div>';
	}else{
		//fc = '<div style="font-family:verdana;font-size:10px;font-weight:bolder;text-align:left;width:100%;">CODE:</div><pre class="CICodeFormatter" '+parentStyle+'><code>'+fc+'</code></pre>';
		fc = '<pre '+((this.embededStylesheet == "false")?"class=\"CICodeFormatter\"":"")+' '+parentStyle+'><code '+((this.embededStylesheet == "false")?"class=\"CICodeFormatter\"":"style=\"color:#000000;word-wrap:normal;\"")+'>'+fc+'</code></pre>';
		//fc = '<pre '+((this.embededStylesheet == "false")?"class=\"CICodeFormatter\"":"")+' '+parentStyle+'>'+fc+'</pre>';
	}
	this.sourceCodeFormattedTextareaObj.value=styleSheet+fc;
	this.sourceCodeOutputDivObj.innerHTML = styleSheet+fc;
}

CICodeFormatter.prototype.getStyleSheet = function(){
	var style = "";
	style = "<style type=\"text/css\">\n";
	style +="pre.CICodeFormatter{\n\tfont-family:arial;\n\tfont-size:12px;\n\tborder:1px dashed #CCCCCC;\n\twidth:"+this.blockWidth+";\n\theight:"+this.blockHeight+";\n\toverflow:auto;\n\tbackground:#f0f0f0;\n\tline-height:20px;\n\t"+((this.tag=="false" && this.alternativeBackground=="true")?"background-image:URL(http://2.bp.blogspot.com/_z5ltvMQPaa8/SjJXr_U2YBI/AAAAAAAAAAM/46OqEP32CJ8/s320/codebg.gif);":"")+"\n\tpadding:0px;\n\tcolor:#000000;\n\ttext-align:left;\n}\n";
	style +="pre.CICodeFormatter code{\n\tcolor:#000000;\n\tword-wrap:normal;\n}\n";
	if(this.tag=="true"){
		style +="div.CICodeFormatter span{\n\twidth:30px;\n\tcolor:gray;\n}\n";
		style +="div.CICodeFormatter div.CICodeLine1,div.CICodeLine0{\n\twidth:150em;\n\theight:20px;\n\tbackground:#f0f0f0;\n\twhite-space : nowrap;\n}\n";
		style +="div.CICodeFormatter div.CICodeLine0{\n\tbackground:#ffffff;\n}\n";
	}
	style +="</style>\n";
	return style;
}


</script>
		<!--		<script language="javascript" src="CICodeFormatter.js" type="text/javascript"></script>-->
		
		<script language="Javascript">
			var cf = new CICodeFormatter("txtSourceCode","txtSourceCodeFormat","divSourceCodeOutPut");
			/*function showFormattedCode(){
				cf.formatSourceCode('',
									document.getElementById('cbDiv').value,
									document.getElementById('cbTabSize').value,
									document.getElementById('cbLineNumbering').value,
									document.getElementById('cbRemoveBlankLines').value,
									document.getElementById('cbEmbededStylesheet').value,
									document.getElementById('cbCodeDivWidth').value,
									document.getElementById('cbCodeDivHeight').value);
			}*/
			function showFormattedCode(){
				cf.formatSourceCode('',
									"false",
									document.getElementById('cbTabSize').value,
									document.getElementById('cbLineNumbering').value,
									document.getElementById('cbRemoveBlankLines').value,
									document.getElementById('cbEmbededStylesheet').value,
									document.getElementById('cbCodeDivWidth').value,
									document.getElementById('cbCodeDivHeight').value,
									document.getElementById('cbAlternativeBackground').value);
			}