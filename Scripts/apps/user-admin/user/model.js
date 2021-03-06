var User = Backbone.Model.extend({
    urlRoot: "http://localhost:8080/user?id=",
    validate: function (atts, opts)  {
        if (!(atts.email && atts.name)) {
            return "Trenger epost og navn"
        }
    },
    initialize: function () {
        this.on("invalid", function (m) {
            alert(m.validationError);
        });
    },
    select: function () {
        UserAdmin.trigger("user:selected", this);
    },
    parse : function (m) {   //pase legger til verdier på modellen når den blir instansiert
        m.fullName = m.name;
        m.createdDateString = moment(m.createdDate.year +""+ m.createdDate.month +""+ m.createdDate.day,"YYYYMMDD").format();

        // console.log(m.createdDate.year +""+ m.createdDate.month +""+ m.createdDate.day);
        // m.blahblah = m.lala;
        // m.gravatarUrl = function (size) {
        //     return "http://gravatar.come/avatar/" + hex_md5(m.email) + "?s?" + size;
        // }
        return m;
    }
});
var UsersCollection = Backbone.Collection.extend({
    url : "http://localhost:8080/users",
    model : User
});