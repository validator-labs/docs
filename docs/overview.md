---
title: Overview
sidebar_position: 1
---

## Goals

The validator framework aims to provide an open standard for producing and alerting on informative, actionable validation results pertaining to infrastructure, networking, Kubernetes cluster internals, and more.

The framework supports two primary use-cases:

* Pre-flight environment validation
* Continuous configuration drift monitoring

Various plugins and plugin rules exist for validating a wide variety of systems. Pick and choose from them to craft a validation profile that meets your requirements.

## Example

This example for AWS defines a rule that ensures EC2 quota is available with a configured buffer.

```yaml
apiVersion: validation.spectrocloud.labs/v1alpha1
kind: AwsValidator
metadata:
  name: awsvalidator-sample-service-quota
spec:
  defaultRegion: us-west-1
  serviceQuotaRules:
  - name: EC2
    region: us-east-2
    serviceCode: ec2
    serviceQuotas:
    - name: "EC2-VPC Elastic IPs"
      buffer: 1
    - name: "Public AMIs"
      buffer: 1
```
