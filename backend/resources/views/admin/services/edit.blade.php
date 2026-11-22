@extends('layouts.admin')
@section('title', 'Edit Service')
@section('content')
@include('admin.services._form', ['item' => $item])
@endsection