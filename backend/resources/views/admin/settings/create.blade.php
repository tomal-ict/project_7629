@extends('layouts.admin')
@section('title', 'New Setting')
@section('content')
@include('admin.settings._form', ['item' => null])
@endsection