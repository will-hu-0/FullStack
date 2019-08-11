<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="ctxPath" value="${pageContext.request.contextPath}" />
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <%--    <link rel="icon" href="../../favicon.ico"/>--%>

    <title>Registration</title>

    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="${ctxPath}/assets/css/site.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css"
          integrity="sha384-i1LQnF23gykqWXg6jxC2ZbCbUMxyw5gLZY6UiUS98LYV5unm8GWmfkIS6jqJfb4E"  crossorigin="anonymous" />
</head>
<body>
<div class="container">
    <div class="signin-header">
        <h2 class="signin-heading">REGISTRATION</h2>
        <hr/>
    </div>

    <div class="form-signin col-12">
        <div class="form-group row">
            <label for="inputName" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputName" placeholder="Enter name">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail" placeholder="Enter email">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputUsername" placeholder="Enter username">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword" placeholder="Enter password">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-3"></div>
            <div class="col-sm-9">
                <input type="checkbox" class="form-check-input" id="isAdmin">
                <label for="isAdmin">Is administrator?</label>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-4">
                <img src="${ctxPath}/captcha_image" class="captcha-image" onclick="refreshCaptcha()" width="120" height="40" alt="Captcha Code"/>
                <a href="javascript:void(0)" class="btn-refresh" onclick="refreshCaptcha()">
                    <i class="fas fa-redo"></i>
                </a>
            </div>
            <div class="col-sm-6">
                <input class="form-control captcha-input" name="kaptcha" id="kaptcha" class="form-control"
                       placeholder="Enter Captcha" required="" autocomplete="off">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <button class="btn btn-lg btn-primary btn-block" onclick="registerUser()">Submit</button>
            </div>
            <div class="col-sm-6">
                <button class="btn btn-lg btn-primary btn-block" onclick="reset()">Reset</button>
            </div>
        </div>
        <div class="form-group row">
            <div class="float-right">
                Back to <a href="${ctxPath}/login">login</a> page.
            </div>
        </div>
        <div class="form-group row">
            <div class="alert alert-success" style="display: none" id="successMessage" role="alert">
            </div>
            <div class="alert alert-danger" style="display: none" id="exceptionMessage" role="alert">
            </div>
        </div>
    </div>

</div> <!-- /container -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"></script>

<script type="text/javascript">

    function refreshCaptcha() {
        $(".captcha-image").attr("src", "${ctxPath}/captcha_image?ts=" + Date.now());
    }

    function registerUser() {
        var data = {
            name : $('#inputName').val(),
            email : $('#inputEmail').val(),
            username : $('#inputUsername').val(),
            password : $('#inputPassword').val(),
            admin : $('#isAdmin').prop('checked')
        };

        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "${ctxPath}/register?kaptcha=" + $('#kaptcha').val(),
            data : JSON.stringify(data),
            dataType : 'json',
        }).done(function(res) {
            $('#successMessage').html("Registration is successful. You may <a href='${ctxPath}/login'>login</a> now.");
            $('#successMessage').show();
        }).fail(function(res) {
            $('#exceptionMessage').html("Exception happened: " + res.responseText);
            $('#exceptionMessage').show();
        })
    }

    function reset() {
        $('#inputName').val('');
        $('#inputEmail').val('');
        $('#inputUsername').val('');
        $('#inputPassword').val('');
        $('#isAdmin').prop('checked', false);
        $('#kaptcha').val('');
        $('#exceptionMessage').html('');
        $('#exceptionMessage').hide();
    }
</script>
</body>
