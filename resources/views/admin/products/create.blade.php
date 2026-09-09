@extends('layouts.admin')
@section('title', 'New Product')
@section('content')
@include('admin.products._form', ['item' => null])
@endsection