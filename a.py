class StaticCheck(Visitor):
    def visitBinOp(self,ctx:BinOp,o):
        e1t = self.visit(ctx.e1, o)
        e2t = self.visit(ctx.e2, o)
        if ctx.op in ['+', '-', '*']:
            if e1t == 3 or e2t == 3:
                raise TypeMismatchInExpression(ctx)
            if e1t == 2 or e2t == 2:
                return 2
            return 1
        if ctx.op in ['/']:
            if e1t == 3 or e2t == 3:
                raise TypeMismatchInExpression(ctx)
            return 2
        if ctx.op in ['&&', '||']:
            if e1t != 3 or e2t != 3:
                raise TypeMismatchInExpression(ctx)
            return 3
        if ctx.op in ['>', '<', '==', '!=']:
            if e1t != za:
                raise TypeMismatchInExpression(ctx)
            return 3
        
        
        
    def visitUnOp(self,ctx:UnOp,o):
        e1t = self.visit(ctx.e, o)
        if ctx.op in ['!']:
            if e1t != 3:
                raise TypeMismatchInExpression(ctx)
            return 3
        if ctx.op in ['-']:
            if e1t == 3:
                raise TypeMismatchInExpression(ctx)
            if e1t == 2:
                return 2
            return 1
        
    def visitIntLit(self,ctx:IntLit,o):
        return 1

    def visitFloatLit(self,ctx,o):
        return 2

    def visitBoolLit(self,ctx,o):
        return 3

class Type(ABC): pass

class IntType(Type): pass

class FloatType(Type): pass

class BoolType(Type): pass


class StaticCheck(Visitor):
    def visitBinOp(self,ctx:BinOp,o):
        e1t = self.visit(ctx.e1, o)
        e2t = self.visit(ctx.e2, o)
        if ctx.op in ['+', '-', '*']:
            if e1t is BoolType or e2t is BoolType:
                raise TypeMismatchInExpression(ctx)
            if e1t is FloatType or e2t is FloatType:
                return FloatType()
            return IntType()
        if ctx.op in ['/']:
            if e1t is BoolType or e2t is BoolType:
                raise TypeMismatchInExpression(ctx)
            return FloatType()
        if ctx.op in ['&&', '||']:
            if e1t is not BoolType or e2t is not BoolType:
                raise TypeMismatchInExpression(ctx)
            return BoolType()
        if ctx.op in ['>', '<', '==', '!=']:
            if e1t != e2t:
                raise TypeMismatchInExpression(ctx)
            return BoolType()
        
        
        
    def visitUnOp(self,ctx:UnOp,o):
        e1t = self.visit(ctx.e, o)
        if ctx.op in ['!']:
            if e1t is not BoolType:
                raise TypeMismatchInExpression(ctx)
            return BoolType()
        if ctx.op in ['-']:
            if e1t is BoolType:
                raise TypeMismatchInExpression(ctx)
            if e1t is FloatType():
                return FloatType()
            return IntType()
        
    def visitIntLit(self,ctx:IntLit,o):
        return IntType()

    def visitFloatLit(self,ctx,o):
        return FloatType()

    def visitBoolLit(self,ctx,o):
        return BoolType()
