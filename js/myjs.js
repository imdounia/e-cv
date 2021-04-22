var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #313131}";
    document.body.appendChild(css);
};



//LOADER
setTimeout(function(){
    $(window).css("overflow","hidden");
    $('.loader_bg').fadeOut();
  }, 700);


//CONTACT FORM
$(function() {
    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // TODO: The rest of the code will go here...
    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
    // Stop the browser from submitting the form.
    event.preventDefault();

    // TODO
    // Serialize the form data.
    var formData = $(form).serialize();
    // Submit the form using AJAX.
    $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
    })

    .done(function(response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');
    
        // Set the message text.
        $(formMessages).text(response);
    
        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
    })

    .fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');
    
        // Set the message text.
        if (data.responseText !== '') {
            $(formMessages).text(data.responseText);
        } else {
            $(formMessages).text('Oops! An error occured and your message could not be sent.');
        }
    });

    
    });
});