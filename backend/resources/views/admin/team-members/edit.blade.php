@extends('layouts.admin')
@section('title', 'Edit Team Member')
@section('content')
@include('admin.team-members._form', ['item' => $item])
@endsection