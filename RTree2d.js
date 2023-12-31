 //Its is a CommonJS module format to be used for creating an 
//  RTree2d instance and using all the functions from insert,search
 
 const RTree2d=(function(){var scope = this;

!function(t)
{
    var i,n,e;
    !function(t){
        function r(t,i){
            return m.call(t,i)
        }
        function s(t,i){
            var n,e,r,s,h,o,c,l,_,u,a,f=i&&i.split("/"),d=v.map,p=d&&d["*"]||{};
            if(t&&"."===t.charAt(0))
                if(i){
                    for(t=t.split("/"),h=t.length-1,v.nodeIdCompat&&x.test(t[h])&&(t[h]=t[h].replace(x,"")),t=f.slice(0,f.length-1).concat(t),_=0;_<t.length;_+=1)if(a=t[_],"."===a)t.splice(_,1),_-=1;
                    else 
                        if(".."===a){if(1===_&&(".."===t[2]||".."===t[0]))
                            break;
                        _>0&&(t.splice(_-1,2),_-=2)}t=t.join("/")}else 0===t.indexOf("./")&&(t=t.substring(2));
                        if((f||p)&&d){for(n=t.split("/"),_=n.length;_>0;_-=1){
                            if(e=n.slice(0,_).join("/"),f)
                                for(u=f.length;u>0;u-=1)if(r=d[f.slice(0,u).join("/")],r&&(r=r[e])){
                                    s=r,o=_;
                                    break
                                }
                                if(s)
                                    break;!c&&p&&p[e]&&(c=p[e],l=_)}!s&&c&&(s=c,o=l),s&&(n.splice(0,o,s),t=n.join("/"))
                                }
                                return t
                            }
                            function h(i,n){
                                return function(){
                                    var e=C.call(arguments,0);
                                    return"string"!=typeof e[0]&&1===e.length&&e.push(null),f.apply(t,e.concat([i,n]))
                                }
                            }
                            function o(t){
                                return function(i){return s(i,t)
                            }
                        }
                        function c(t){
                            return function(i){g[t]=i}
                        }
                        function l(i){
                            if(r(b,i)){
                                var n=b[i];
                                delete b[i],S[i]=!0,a.apply(t,n)
                            }
                            if(!r(g,i)&&!r(S,i))
                                throw new Error("No "+i);
                                return g[i]
                        }
                        function _(t){
                            var i,n=t?t.indexOf("!"):-1;
                            return n>-1&&(i=t.substring(0,n),t=t.substring(n+1,t.length)),[i,t]
                        }
                        function u(t){
                            return function(){
                                return v&&v.config&&v.config[t]||{}
                            }
                        }
                        var a,f,d,p,g={},b={},v={},S={},m=Object.prototype.hasOwnProperty,C=[].slice,x=/\.js$/;
                        d=function(t,i){
                            var n,e=_(t),r=e[0];
                            return t=e[1],r&&(r=s(r,i),n=l(r)),r?t=n&&n.normalize?n.normalize(t,o(i)):s(t,i):(t=s(t,i),e=_(t),r=e[0],t=e[1],r&&(n=l(r))),{f:r?r+"!"+t:t,n:t,pr:r,p:n}
                        }
                        ,p={
                            require:function(t){
                            return h(t)
                            },
                            exports:function(t){
                                 var i=g[t];
                                 return"undefined"!=typeof i?i:g[t]={}},module:function(t){
                                    return{
                                        id:t,uri:"",exports:g[t],config:u(t)
                                    }
                                }
                            }
                            ,a=function(i,n,e,s){
                                var o,_,u,a,f,v,m=[],C=typeof e;
                                if(s=s||i,"undefined"===C||"function"===C){
                                    for(n=!n.length&&e.length?["require","exports","module"]:n,f=0;f<n.length;f+=1)
                                        if(a=d(n[f],s),_=a.f,"require"===_)
                                            m[f]=p.require(i);
                                        else if("exports"===_)
                                            m[f]=p.exports(i),v=!0;
                                        else if("module"===_)
                                            o=m[f]=p.module(i);
                                        else if(r(g,_)||r(b,_)||r(S,_))
                                            m[f]=l(_);
                                        else{
                                            if(!a.p)
                                                throw new Error(i+" missing "+_);
                                                a.p.load(a.n,h(s,!0),c(_),{}),m[f]=g[_]}u=e?e.apply(g[i],m):void 0,i&&(o&&o.exports!==t&&o.exports!==g[i]?g[i]=o.exports:u===t&&v||(g[i]=u))
                                }
                                else
                                    i&&(g[i]=e)
                            }
                            ,i=n=f=function(i,n,e,r,s){
                                if("string"==typeof i)
                                    return p[i]?p[i](n):l(d(i,n).f);
                                if(!i.splice){
                                    if(v=i,v.deps&&f(v.deps,v.callback),!n)
                                        return;
                                    n.splice?(i=n,n=e,e=null):i=t
                                }
                                return n=n||function(){
                                }
                                ,"function"==typeof e&&(e=r,r=s),r?a(t,i,n,e):setTimeout(function(){
                                    a(t,i,n,e)
                                }
                                ,4),f
                            }
                            ,f.config=function(t){
                                return f(t)
                            }
                            ,i._defined=g,e=function(t,i,n){
                                if("string"!=typeof t)
                                    throw new Error("See almond README: incorrect module build, no module name");
                                i.splice||(n=i,i=[]),r(g,t)||r(b,t)||(b[t]=[t,i,n])
                            }
                            ,e.amd={jQuery:!0}
                        }()
                        ,e("bower_components/almond/almond.js",function(){}),e("src/type",[],function(){
                            "use strict";
                            function t(t){
                                var i=Array.prototype.slice.call(arguments,1);
                                return i.forEach(function(i){
                                    for(var n in i)
                                        i.hasOwnProperty(n)&&(t[n]=i[n])
                                })
                                ,t
                            }
                            return function(i){
                                var n,e;
                                try{
                                    n=arguments.length>1?[Object.create(i)].concat(Array.prototype.slice.call(arguments,1)):[{},i],e=t.apply(null,n),e.constructor.prototype=e
                                }
                                catch(r){
                                    throw console.error("type: Cannot make constructor function and prototype with ",arguments),r
                                }
                                return e.constructor
                            }
                        })
                        ,e("src/Rectangle",["./type"],function(t){
                            function i(t,i,n){
                                return t=Math.max(i,t),t=Math.min(t,n)
                            }
                            return t({
                                constructor:function(t,i,n,e){
                                    this.l=t,this.b=i,this.r=t+n,this.t=i+e,this.w=n,this.h=e,this.area=n*e
                                }
                                ,toString:function(){
                                    return"["+[this.l,this.b,this.r,this.t,this.w,this.h].join(",")+"]"
                                }
                                ,equals:function(t,i,n,e){
                                    return n===this.r&&e===this.t&&t===this.l&&i===this.b
                                }
                                ,contains:function(t,i,n,e){
                                    return n<=this.r&&e<=this.t&&t>=this.l&&i>=this.b
                                }
                                ,draw:function(t){
                                    t.strokeStyle="rgba(0,0,0,1)",t.strokeRect(this.l,this.b,this.w,this.h)
                                }
                                ,include:function(t,i,n,e){
                                    this.l=this.l<t?this.l:t,this.b=this.b<i?this.b:i,this.r=this.r>n?this.r:n,this.t=this.t>e?this.t:e,this.w=this.r-this.l,this.h=this.t-this.b,this.area=this.w*this.h
                                }
                                ,copy:function(){
                                    return new this.constructor(this.l,this.b,this.w,this.h)
                                }
                                ,reset:function(){
                                    this.l=1/0,this.r=-(1/0),this.b=1/0,this.t=-(1/0),this.w=0,this.h=0,this.area=0
                                }
                                ,expansionCost:function(t,i,n,e){
                                    return t=this.l<t?this.l:t,i=this.b<i?this.b:i,n=this.r>n?this.r:n,e=this.t>e?this.t:e,(n-t)*(e-i)-this.area
                                }
                                ,interacts:function(t,i,n,e){
                                    return this.l<=n&&this.r>=t&&this.b<=e&&this.t>=i
                                }
                                ,squaredDistanceTo:function(t,n){
                                    var e=i(t,this.l,this.r),r=i(n,this.b,this.t);
                                    return Math.pow(e-t,2)+Math.pow(r-n,2)
                                }
                            }
                        )})
                        ,e("src/BranchMixin",["./Rectangle"],function(t){
                            function i(t,i){
                                return t.push(i),t
                            }
                            function n(t,i){
                                var n=t.r,e=t.parent;
                                if(n.include(i.l,i.b,i.r,i.t),!e.contains(i.l,i.b,i.r,i.t))
                                    throw console.error("parent",n.toString(),"child",i.toString()),"parent doesnt contain";
                                    return t
                                }
                                return{
                                    __getChildren:function(){
                                        return this._foldChildren(i,[])
                                    }
                                    ,__checkCount:function(){
                                        if(this.__getChildren().length!==this.size)
                                            throw console.log("counts",this," children-count + "+this.__getChildren().length+" vs size = "+this.size),"child count vs size is not correct";
                                        if(this.size>this.branchingFactor)
                                            throw console.error("size is not correct",this," brancing factor = "+this.branchingFactor+" vs size = "+this.size),"size exceeds branching factor"
                                    }
                                    ,__checkChildrendLinkedList:function(){
                                        var t=this.__firstChild;
                                        if(t&&null!==t.__previousSibling)
                                            throw console.error("first child should not have backref",this,t),"First child should not have a backreference";
                                            this.__getChildren().forEach(function(t){
                                                if(t.__nextSibling&&t!==t.__nextSibling.__previousSibling)
                                                    throw console.error("next back reference is not correct",t,t.__nextSibling),"next back reference is not correct";
                                                    if(t.__previousSibling&&t.__previousSibling.__nextSibling!==t)
                                                        throw console.error("next back reference is not correct",t,t.__previousSibling),"prev back reference is not correct"
                                                }
                                            )
                                    }
                                    ,__checkBB:function(){
                                        var i=new t(this.l,this.b,this.w,this.h);
                                        if(i.reset(),this._foldChildren(n,{
                                            r:i,parent:this
                                        })
                                        ,!i.equals(this.l,this.b,this.r,this.t))
                                            throw console.error(this,this.__getChildren(),i.toString(),this.toString()),"doesnt fit snug"},__validateChildren:function(){
                                                this.__getChildren().forEach(function(t){
                                                    t.__validate&&t.__validate()
                                                })
                                            }
                                            ,__validate:function(){
                                                this.__checkCount(),this.__checkChildrendLinkedList(),this.__checkBB(),this.__validateChildren()
                                            }
                                }
                        })
                        ,e("src/PriorityQueue",["./type"],function(t){
                            return t({
                                constructor:function(t){
                                    this._items=[],this._comp=t
                                }
                                ,size:function(){
                                    return this._items.length
                                }
                                ,clear:function(){
                                    this._items.length=0
                                }
                                ,enqueue:function(t){
                                    this._items.push(t),this._bubble(this._items.length-1)
                                }
                                ,dequeue:function(){
                                    var t=this._items[0];
                                    return this._items.length>1?(this._items[0]=this._items.pop(),this._sink(0)):this._items.length=0,t
                                }
                                ,_sink:function(t){
                                    for(var i,n,e,r,s,h=this._items[t],o=this._items.length;;){
                                        if(i=2*(t+1),e=i-1,n=null,o>e&&(r=this._items[e],this._comp(r,h)<=0&&(n=e)),o>i&&(s=this._items[i],this._comp(s,null===n?h:r)<=0&&(n=i)),null===n)
                                            break;
                                        this._items[t]=this._items[n],this._items[n]=h,t=n
                                    }
                                }
                                ,_bubble:function(t){
                                    for(var i,n,e=this._items[t];t>0&&(i=Math.floor((t+1)/2)-1,n=this._items[i],!(this._comp(n,e)<=0));)
                                        this._items[i]=e,this._items[t]=n,t=i
                                }
                            })
                        })
                        ,e("src/Branch",["./Rectangle","./BranchMixin","./type","./PriorityQueue"],function(t,i,n,e){
                            function r(t,i,n){
                                for(var e;t;)
                                    e=t.__nextSibling,i.expansionCost(t.l,t.b,t.r,t.t)<n.expansionCost(t.l,t.b,t.r,t.t)?i._addChild(t):n._addChild(t),t=e
                            }
                            function s(t,i){
                                return i.draw&&i.draw(t),t
                            }
                            var h=new e(function(t,i){
                                return t.__dist-i.__dist}),o=n({},t.prototype,{
                                    isEntry:!0,constructor:function(i,n,e,r,s){
                                        this.object=i,this.__nextSibling=null,this.__dist=0,t.call(this,n,e,r,s)
                                    }
                                    ,draw:function(t){
                                        t.fillStyle="rgba(240,240,230,0.7)",t.fillRect(this.l,this.b,this.w,this.h)
                                    }
                                    ,toString:function(){
                                        var i=t.prototype.toString.call(this);return i+" entry"
                                    }
                                });
                                return n({},t.prototype,i,{isEntry:!1,constructor:function(i,n,e,r,s){
                                    this.leaf=!1,this.size=0,this.branchingFactor=s,this.parent=null,this.depth=0,this.__dist=0,this.__firstChild=null,this.__nextSibling=null,this.__previousSibling=null,this.__nextSearch=null,this._seed1=null,this._seed2=null,t.call(this,i,n,e,r)},draw:function(t){
                                        t.lineWidth=Math.ceil((this.depth+1)/3),t.strokeStyle=this.leaf?"rgba(205,192,176,0.8)":"rgba(139,131,120,0.6)",t.strokeRect(this.l,this.b,this.w,this.h),this._foldChildren(s,t)
                                    }
                                    ,_foldChildren:function(t,i){
                                        for(var n=this.__firstChild;n;)
                                            i=t(i,n),n=n.__nextSibling;
                                            return i
                                    }
                                    ,_callWhenInteracts:function(t,i,n,e,r){
                                        for(var s=this.__firstChild;s;)
                                            s.interacts(t,i,n,e)&&r(s.object),s=s.__nextSibling},_addPathsToSearchStack:function(t,i,n,e){
                                                for(var r=this.__firstChild;r;)
                                                    r.interacts(t,i,n,e)&&(r.__nextSearch=this.__nextSearch,this.__nextSearch=r),r=r.__nextSibling},_nextOnSearchStack:function(){
                                                        var t=this.__nextSearch;
                                                        return this.__nextSearch=null,t
                                                    }
                                                    ,_addToQueue:function(t,i){
                                                        for(var n=this.__firstChild;n;)
                                                            n.__dist=n.squaredDistanceTo(t,i),h.enqueue(n),n=n.__nextSibling
                                                    }
                                                    ,_knn:function(t,i,n,e){
                                                        h.clear();
                                                        for(var r=this;n&&r;)
                                                            r.isEntry?(n-=1,e(r.object)):r._addToQueue(t,i),r=h.dequeue()
                                                    }
                                                    ,_search:function(t,i,n,e,r){
                                                        var s=t+n,h=i+e,o=this;
                                                        do o.leaf?o._callWhenInteracts(t,i,s,h,r):o._addPathsToSearchStack(t,i,s,h),o=o._nextOnSearchStack();
                                                        while(o)
                                                    }
                                                    ,_selectBestInsertion:function(t,i,n,e){
                                                        for(var r,s,h=1/0,o=this.__firstChild;o;)
                                                            r=o.expansionCost(t,i,n,e),h>r&&(h=r,s=o),o=o.__nextSibling;
                                                            return s
                                                    }
                                                    ,_insert:function(t,i,n,e,r,s){
                                                        for(var h=new o(t,i,n,e,r),c=this;!c.leaf;)
                                                            c.include(i,n,h.r,h.t),c=c._selectBestInsertion(i,n,h.r,h.t);c._addChild(h),c._propagateSplit(s)},_propagateSplit:function(t){
                                                                for(var i,n=this;n&&n.size>n.branchingFactor;)
                                                                    i=n._split(),n.parent?n.parent._addChild(i):t._growTree(n,i),n=n.parent
                                                            }
                                                            ,toString:function(){
                                                                return t.prototype.toString.call(this)+" l: "+this.leaf},_pushNodeOnLinkedList:function(t){
                                                                    t.__nextSibling=this.__firstChild,t.__nextSibling.__previousSibling=t,t.__previousSibling=null,this.__firstChild=t
                                                            }
                                                            ,_setFirstNodeInLinkedList:function(t){
                                                                t.__previousSibling=null,t.__nextSibling=null,this.__firstChild=t
                                                            }
                                                            ,_removeNodeFromLinkedList:function(t){
                                                                this.__firstChild===t?(this.__firstChild=t.__nextSibling,this.__firstChild&&(this.__firstChild.__previousSibling=null)):(t.__previousSibling.__nextSibling=t.__nextSibling,t.__nextSibling&&(t.__nextSibling.__previousSibling=t.__previousSibling)),t.__nextSibling=null,t.__previousSibling=null
                                                            }
                                                            ,_split:function(){
                                                                this.pickSeeds(),this._removeNodeFromLinkedList(this._seed1),this._removeNodeFromLinkedList(this._seed2);
                                                                var t=this.__firstChild;
                                                                this.__firstChild=null,this._addChild(this._seed1);
                                                                var i=this.clone();
                                                                return i._addChild(this._seed2),r(t,this,i),i
                                                            }
                                                            ,pickSeeds:function(){
                                                                for(var t=this.__firstChild,i=this.__firstChild,n=this.__firstChild,e=this.__firstChild,r=this.__firstChild.__nextSibling;r;)r.r<t.r&&(t=r),r.l>i.l&&(i=r),r.t<e.t&&(e=r),r.b>n.b&&(n=r),r=r.__nextSibling;var s,h,o,c;Math.abs(i.l-t.r)>Math.abs((n.b-e.t)*this.w/this.h)?(s=t,h=i,o=e,c=n):(s=e,h=n,o=t,c=i),s!==h?(this._seed1=s,this._seed2=h):o!==c?(this._seed1=o,this._seed2=c):(this._seed1=this.__firstChild,this._seed2=this.__firstChild.__nextSibling)
                                                            }
                                                            ,_findMatchingEntry:function(t){for(var i=this.__firstChild;i;){if(i.object===t)return i;i=i.__nextSibling}},_remove:function(t,i,n,e,r,s){var h,o=i+e,c=n+r,l=this;do{if(l.leaf){if(h=l._findMatchingEntry(t))return l._removeAndPropagate(h,s),!0}else l._addPathsToSearchStack(i,n,o,c);l=l._nextOnSearchStack()}while(l);return!1
                                                        },_fitBounds:function(){this.reset();for(var t=this.__firstChild;t;)this.include(t.l,t.b,t.r,t.t),t=t.__nextSibling},clone:function(){var t=new this.constructor(this.l,this.b,this.w,this.h,this.branchingFactor);return t.parent=this.parent,t.depth=this.depth,t.leaf=this.leaf,t},_removeNode:function(t){this._removeNodeFromLinkedList(t),this.size-=1,t.parent=null,this._fitBounds()},_removeAndPropagate:function(t,i){var n=this;do t?n._removeNode(t):n._fitBounds(),t=0===n.size?n:null,n=n.parent;while(n);t&&(i._root=null)},_addChild:function(t){this.__firstChild?(this._pushNodeOnLinkedList(t),this.size+=1):(this._setFirstNodeInLinkedList(t),this.size=1,this.reset()),t.parent=this,this.include(t.l,t.b,t.r,t.t)}})}),
            e("src/RTree",["./Branch","./type"],function(t,i){
                "use strict";function n(t,i){return t.push(i),t
                }
                return i({
                    constructor:function(t){
                        t=t||{},this._branchingFactor=t.branchingFactor>=3?t.branchingFactor:16,this._root=null,this._size=0
                    }
                    ,nearestNeighbours:function(){
                        function t(t){
                            i.push(t)
                        }
                        var i;
                        return function(n,e,r){
                            return r=r||1,i=[],this._root&&this._root._knn(n,e,r,t),i
                        }
                    }()
                    ,_growTree:function(i,n){
                        var e=new t(i.l,i.b,i.w,i.h,this._branchingFactor);
                        e._addChild(i),e._addChild(n),e.depth=this._root.depth+1,this._root=e
                    }
                    ,draw:function(t){
                        this._root&&this._root.draw(t)
                    }
                    ,size:function(){
                        return this._size
                    }
                    ,forEachInRectangle:function(t,i,n,e,r){
                        this._root&&this._root._search(t,i,n,e,r)
                    }
                    ,mapInRectangle:function(){
                        var t,i,n=function(n){i.push(t(n))};return function(e,r,s,h,o){return i=[],t=o,this.forEachInRectangle(e,r,s,h,n),i}}(),reduceInRectangle:function(){var t,i,n,e=function(e){return i=0===n&&"undefined"==typeof i?e:t(i,e),n+=1,i};return function(r,s,h,o,c,l){return i=l,t=c,n=0,this.forEachInRectangle(r,s,h,o,e),i}}()
                    ,search:function(t,i,e,r){
                        return this.reduceInRectangle(t,i,e,r,n,[])
                    }
                    ,insert:function(i,n,e,r,s){
                        this._root||(this._root=new t(n,e,r,s,this._branchingFactor),this._root.leaf=!0)
                        ,this._root._insert(i,n,e,r,s,this)
                        ,this._size+=1
                    }
                    ,remove:function(t,i,n,e,r){var s=this._root._remove(t,i,n,e,r,this);s&&(this._size-=1)
                    }
                }
                )
            })
                    ,
            t.RTree2d=n("src/RTree")}(this);exports.RTree2d=scope.RTree2d;}).call({});