(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{16:function(e,n,t){e.exports=t(39)},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),l=t(3),o=function(e){var n=e.value,t=e.handleChange;return r.a.createElement("div",null,"filter shown with"," ",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.addName,t=e.newName,a=e.newNumber,u=e.handleNameChange,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:u})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.persons,t=e.handleDeletePerson;return r.a.createElement(r.a.Fragment,null,n.map((function(e,n){return r.a.createElement("li",{key:n},e.name,e.number,r.a.createElement("input",{type:"button",value:"delete",onClick:function(){return t(e)}}))})))},d=(t(4),t(15),t(2)),h=t.n(d),f="https://lit-thicket-58030.herokuapp.com/api/persons",s=function(){return h.a.get(f).then((function(e){return e.data}))},p=function(e){return h.a.post(f,e).then((function(e){return e.data}))},b=function(e,n){return h.a.delete("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},v=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),d=Object(l.a)(c,2),h=d[0],f=d[1],v=Object(a.useState)(""),E=Object(l.a)(v,2),g=E[0],w=E[1],C=Object(a.useState)(""),N=Object(l.a)(C,2),O=N[0],j=N[1],k=O?t.filter((function(e){return e.name.toLowerCase().startsWith(O.toLowerCase())})):t;Object(a.useEffect)((function(){s().then((function(e){u(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(o,{value:O,handleChange:function(e){j(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(i,{addName:function(e){e.preventDefault();var n=!1;(t.filter((function(e){e.name===h&&(n=!0)})),n)?alert("".concat(h," already added to phonebook")):p({name:h,number:g||""}).then((function(e){u(t.concat(JSON.parse(e))),f(""),w("")}))},newName:h,newNumber:g,handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){w(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:k,handleDeletePerson:function(e){if(window.confirm("Delete ".concat(e.name," ?"))){var n=t.filter((function(n){return n.id!==e.id}));b(e.id).then((function(e){return console.log(e)})),u(n)}}}))};c.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.13038a6a.chunk.js.map