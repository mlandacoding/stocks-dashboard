<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>All Global Data</title>
    <!-- Include Tailwind CSS via CDN -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 p-10">
<div id="app" class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
    <tasks-component></tasks-component>
</div>
<!-- Include Vite scripts for the app.js file -->
@vite('resources/js/app.js')
</body>
</html>
