@extends('layouts.admin')
@section('title', 'Edit Product')
@section('content')
@include('admin.products._form', ['item' => $item])
@endsection