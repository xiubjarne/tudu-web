OTR.Chart={};
(function(){var b=OTR.Chart,a=OTR.Graph;b.Flow=function(c){this._nodes=[];this._nodeLink={};this._cfgs=b.Flow.defaults;OTR.apply(this._cfgs,c)};b.Flow.defaults={fontSize:"12px",fontFamily:"Arial",fontColor:"#000000",lineWeight:1,lineColor:"#000000",nodeBackground:"#ffffff",nodeBorderColor:"#333333",nodeBorderWeight:1,nodeBoarderRadius:5,branchBackground:"#ffffff",branchBorderColor:"#333333",branchBorderWeight:1,nodeMarginHor:10,nodeMarginVer:20,nodeHeight:12,nodePadding:12,style:"linera",lineText:false,lineTextTrue:"Yes",lineTextFalse:"No",padding:20};b.Flow.TYPE={NODE:1,BRANCH:0,START:-1,END:-2};b.Flow.prototype={_isRendered:false,_nodeCount:0,_branchCount:0,_maxLen:0,addNode:function(f){if(!f instanceof b.Flow.Node){return}var e=this._nodes.length,d=this._getTextWeight(f.getText());if(f.getType()==b.Flow.TYPE.BRANCH){var c=parseInt(this._cfgs.fontSize);d=d+d*(Math.tan(Math.PI/3)/(c/2))}else{d=d+this._cfgs.nodePadding*2}this._maxLen=Math.max(d,this._maxLen);if(f.getType()==b.Flow.TYPE.BRANCH){this._branchCount++}this._nodeCount++;this._nodes[e]=f;this._nodeLink[f.getId()]=e-1},getNodes:function(){return this._nodes},renderTo:function(c){if(!this._isRendered){this.render()}this._canvas.renderTo(c)},render:function(){var z=this._nodes,w={},F=0,C=z.length,j=this._cfgs.lineText,s=0,G=this._maxLen;var t=this._cfgs,u=t.padding,h=parseInt(t.fontSize),f=G+(2*this._branchCount*t.nodeMarginHor)+(2*this._branchCount*t.nodePadding)+2*u+20,v=t.nodeMarginVer,H=t.nodeMarginHor,K=t.nodeHeight+t.nodePadding*2;nh=K+v*2,ch=this._nodeCount*nh+2*u,id=t.id?t.id:null;this._canvas=OTR.Graph.factory({width:f,height:ch,id:id});for(;F<C;F++){var A=z[F],g=A.getType(),r=A.getText(),I=this._getTextWeight(r)+t.nodePadding*2,q=I*(Math.tan(Math.PI/3)/(h/2));if(g==b.Flow.TYPE.BRANCH){I=I+q}var o=(f-I)/2,n=u+(F*nh)+v,E;if(g==b.Flow.TYPE.NODE){E=new a.Rect({background:t.nodeBackground,borderWeight:t.nodeBorderWeight,borderColor:t.nodeBorderColor,x:o,y:n,width:I,height:K,borderRadius:t.nodeBoarderRadius})}else{if(g==b.Flow.TYPE.BRANCH){E=new a.Polygon({background:t.branchBackground,borderWeight:t.branchBorderWeight,borderColor:t.branchBorderColor,sideCount:4,x:o,y:n,width:I,height:K})}else{E=new a.Cycle({background:t.nodeBackground,borderWeight:t.nodeBorderWeight,borderColor:t.nodeBorderColor,x:(f-K)/2,y:n,width:K,height:K})}}w[A.getId()]=E;this._canvas.drawShape(E);if(g!=b.Flow.TYPE.START&&g!==b.Flow.TYPE.END){this._canvas.drawShape(new a.Text({text:r,fontSize:h,color:t.fontColor,x:o+t.nodePadding+(g==b.Flow.TYPE.BRANCH?q/2:0),y:n+t.nodePadding}));if(j&&g==b.Flow.TYPE.BRANCH){this._canvas.drawShape(new a.Text({text:this._cfgs.lineTextTrue,x:(2*o+I)/2+10,y:n+K}))}}if(F+1<C){this._canvas.drawShape(new a.Line({borderColor:t.lineColor,borderWidth:t.lineWeight,x:o+I/2,y:n+K,dx:o+I/2,dy:n+K+2*t.nodeMarginVer,endArrow:"Block"}));var p=A.getWayFalse();if(undefined!==w[p]){var B=w[p],c=B.attr("y"),m=B.attr("height"),d=B.attr("x"),e=B.attr("width"),D=[],J=o;if(s%2==0){var k=(f+G)/2+((1+s/2)*H)+10,J=o+I;D.push({x:o+I,y:n+K/2}),D.push({x:k,y:n+K/2});D.push({x:k,y:c+m/2});D.push({x:d+e,y:c+m/2})}else{var k=(f-G)/2-((1+s/2)*H)-10;D.push({x:o,y:n+K/2}),D.push({x:k,y:n+K/2});D.push({x:k,y:c+m/2});D.push({x:d,y:c+m/2})}if(j){this._canvas.drawShape(new a.Text({text:t.lineTextFalse,x:J,y:n}))}this._canvas.drawShape(new a.PolyLine({borderColor:t.lineColor,borderWidth:t.lineWeight,points:D,endArrow:"Block"}));s++}}}this._isRendered=true},_getTextWeight:function(f){var d=0,c=f.length,e=0;for(;d<c;d++){if(f.charCodeAt(d)>=255){e+=1}else{e+=0.5}}return e*parseInt(this._cfgs.fontSize)}}})();

(function(){var a=OTR.Chart.Flow;a.Node=function(b){this._attrs={type:OTR.Chart.Flow.TYPE.NODE,text:"",wayTrue:null,wayFalse:null};OTR.apply(this._attrs,b)};a.Node.prototype={setId:function(b){this._attrs.id=b},getId:function(){return this._attrs.id},getText:function(){return this._attrs.text},setText:function(b){if(typeof b=="string"){this._attrs.text=b}},getType:function(){return this._attrs.type},setType:function(b){this._attrs.type=b},getWayTrue:function(){return this._attrs.wayTrue},setWayTrue:function(b){this._attrs.wayTrue=b},getWayFalse:function(){return this._attrs.wayFalse},setWayFalse:function(b){this._attrs.wayFalse=b}}})();