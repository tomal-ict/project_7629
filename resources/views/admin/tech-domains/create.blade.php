@extends('layouts.admin')
@section('title', 'New Tech Domain')
@section('content')
@include('admin.tech-domains._form', ['item' => null])
@endsection