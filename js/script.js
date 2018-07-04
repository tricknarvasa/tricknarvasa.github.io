$(document).ready(function () {
    // Navigation Bar
    var nav = $("#navBody").offset().top;
    var search = $("#content #search").offset().top;

    $("#postsLink").click(function (evt) {
        evt.preventDefault();
        $("#posts").fadeIn(700);
        $("body").animate({ scrollTop: ($('#posts').offset().top - 50)}, 700);
    });
    
    $("#homeLink").click(function (evt) {
        evt.preventDefault();    
        $("body").animate({ scrollTop: 0}, 700);
    });
    
    $("#photoLink").click(function (evt) {
        evt.preventDefault();  $("#posts").fadeIn(700);
        $("#photos").fadeIn(1000);
        $("body").delay(200).animate({ scrollTop: ($('#photos').offset().top - 50)}, 700);
    });
	
	$("#postsLink").click(function (evt) {
        evt.preventDefault();
        $("#albums").fadeIn(700);
        $("body").animate({ scrollTop: ($('#albums').offset().top - 50)}, 700);
    });  
    
    $("#navBody #search").fadeIn(200);
    
   $(window).scroll(function () {
        if($(this).scrollTop() > nav){
            $("#nav").addClass("sticky");
            
            $(".sticky nav a").hover(function () {
                $(this).css("border-bottom", "2px solid #000");
            }, function () {
                $(this).css("border-bottom", "0");
            })
            
        }
        else{
            $("#nav").removeClass("sticky");
            
            $("#nav nav a").hover(function () {
                $(this).css("border-bottom", "2px solid #fff");
            }, function () {
                $(this).css("border-bottom", "0");
            })
            
        }
        
     
    });
    
	
	
   
});

function showModal(data, i){
    var photo = data.searchPhotoById(i);
    
    $("#modal").fadeOut(200);
    $(window).off("click");
    
    $("#modal").fadeIn(200, function () {
        var disp = "<div id=\"modal-content\">";
        disp += "<div id=\"image\"><img src=\"" + photo.url + "\" alt=\"" + photo.title + "\"/>";
        disp += "</div><div class=\"title\">" + photo.title + "</div></div>";
        
        $("#modal").html(disp);
        $("#modal-content").draggable({containment: "body"});
        
        $(window).click(function () {
            $("#modal").fadeOut(200);
         });
    });
}

function displayPosts (data) {
    //var pages = data.posts.length / 10;
	var limit = 0;
    $("#posts").empty();
    for(var i = 0; i < 10; i++){
        var post = "<div class=\"post\">";
        var user = data.searchUserById(data.posts[i].userId);
        
        post += "<div class=\"post-head\">";
        post += "<span class=\"title\">" + data.posts[i].title + "</span><br/>";
        post += "<span class=\"user\"> by <a href=\"user.html?" + user.id + "\">" +  user.username + "</a></span>";
        post += "</div>"
        
        post += "<div class=\"post-content\">"
        post += "<p>" + data.posts[i].body + "</p>";
        post += "</div>";
        
        post += "</div>";
        
        $("#posts").append(post);
    }
	
	$("#morePosts").click(function(){
		limit = i;
		for(i = limit; i < (limit + 10); i++){
			var post = "<div class=\"post\">";
			var user = data.searchUserById(data.posts[i].userId);
			
			post += "<div class=\"post-head\">";
			post += "<span class=\"title\">" + data.posts[i].title + "</span><br/>";
			post += "<span class=\"user\"> by <a href=\"user.html?" + user.id + "\">" +  user.username + "</a></span>";
			post += "</div>"
			
			post += "<div class=\"post-content\">"
			post += "<p>" + data.posts[i].body + "</p>";
			post += "</div>";
			
			post += "</div>";
			
			$("#posts").append(post);
		}
	});
	
	
}

function displayPhotos(data){
    $("#photos").empty();
    
	var limit = 0;
	
    for(var i = 0; i < data.photos.length && i < 15; i++){
        var photo = data.photos[i];
        var post = "<div class=\"photo\">";
        post += "<img src=\"" + photo.thumbnailUrl + "\" alt=\"" + photo.title + "\" data-value=\"" + photo.id + "\"/>";
        post += "</div>";
           
        $("#photos").append(post);
    }
	
	$("#morePhotos").click(function(){
		limit = i;
		for(i = limit; i < (limit + 10); i++){
			var photo = data.photos[i];
			var post = "<div class=\"photo\">";
			post += "<img src=\"" + photo.thumbnailUrl + "\" alt=\"" + photo.title + "\" data-value=\"" + photo.id + "\"/>";
			post += "</div>";
           
        $("#photos").append(post);
		}
	});
	
    
    $("#photos").children('.photo').each(function () {
       $(this).click(function () {
           var id = $(this).children("img").data('value');
           showModal(data, id);
       });
    });
}