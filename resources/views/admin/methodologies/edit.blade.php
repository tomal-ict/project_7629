@extends('layouts.admin')
@section('title', 'Edit Step')
@section('content')
@include('admin.methodologies._form', ['item' => $item])
@endsection