@extends('layouts.admin')
@section('title', 'Edit Tech Domain')
@section('content')
@include('admin.tech-domains._form', ['item' => $item])
@endsection