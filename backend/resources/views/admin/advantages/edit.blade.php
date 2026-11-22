@extends('layouts.admin')
@section('title', 'Edit Advantage')
@section('content')
@include('admin.advantages._form', ['item' => $item])
@endsection