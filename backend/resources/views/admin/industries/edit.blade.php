@extends('layouts.admin')
@section('title', 'Edit Industry')
@section('content')
@include('admin.industries._form', ['item' => $item])
@endsection